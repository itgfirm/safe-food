define([ 'angular', 'app',
	'components/services/location-service' ],
	function(angular, app) {

		
		app.service('OpenFDAService', function($http, $q, LocationService, $filter) {
			//TODO: These should come from the app's config file:
			var service = { meta: null },
				baseUrl = 'https://api.fda.gov/food/enforcement.json',
				apiKey = 'RQklIryrO1GobRvtpSV6W3gE6z3IXIinmqxiIiuB';


			var state_hash;
			//not using a promise here, so it's just assumed this will load prior to it's first use.
			$http.get('./states_hash.json')
			    .success(function(data) {
			        state_hash = data;
			        console.log('States JSON Loaded');
			    })
			    .error(function() {
			        console.error('could not find state_hash.json');
			    });


			service.getMeta = function() {
				var defer = $q.defer();
					
				$http.get(baseUrl, { params : { limit: 1 } })
					.success(function(data) {
						delete data.meta.results;
						service.meta = data.meta;
						defer.resolve(angular.copy(service.meta));
					});

				return defer.promise;
			};


			service.getData = function(params) {
				var defer = $q.defer(),
					params = params || {},
					requestParams = {
						search: createSearchString(params),
						limit: params.limit || 25,
						skip: (params.page || 0) * 25
					};

				requestParams.search = createSearchString(params)

				$http.get(createURL(baseUrl, requestParams))
					.success(function(data) {

						angular.forEach(data.results, function(result) {
							result.recall_initiation_date = convertFDADateString(result.recall_initiation_date);
							result.report_date = convertFDADateString(result.report_date);
						});

						defer.resolve(data);
					}).
					error(function(err){
						defer.reject(err);
					});

				return defer.promise;
			};

			service.searchNearMe = function() {
				var defer = $q.defer();

				LocationService.getGeolocation()
					.then(function(data) {
						LocationService.getStateFromCoords(data.coords)
							.then(function(data) {
								service.getData({ distribution_pattern: data.short_name })
									.then(function(data) {
										defer.resolve(data);
									});
							})
					}, function(error) {
						defer.reject(error);
					});

				return defer.promise;
			};

			function convertFDADateString(dateString) {
				if(!dateString) {
					return null;
				}

				var year = dateString.substr(0, 4),
					month = dateString.substr(4, 2),
					date = dateString.substr(6, 2);

				return  month + '/' + date + '/' + year;
			}

			/**
			 * This function is required because the OpenFDA API queries throw errors 
			 * when they get certain characters 
			 * and they do NOT support URL encoding of said characters
			 * @param  {string} paramVal the raw input from the form
			 * @return {string}          the "cleaned" input - swapping spaces 
			 *                               for all non-alpha-numeric characters
			 */
			function sanitizeInputs(paramVal) {

				//replacing with spaces so that it can be tokenized as words later.
				return paramVal.replace(/[^a-zA-Z0-9 ]/g, ' ');

				//rather than whitelist we can try a blacklist:
				// return paramVal.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' ');
			}


			/**
			 * looks up state names and includes an "OR" term that includes the 
			 * 		entered term, the alternate state name/abbreviation and the 
			 * 		"nationwide" keyword.
			 * @param  {string} paramVal the cleaned input that may or may not include
			 *                           state names/abbreviations
			 * @return {string}          a string with any state terms replaced by a 
			 *                             compound term encompasing all possible 
			 *                             coverage terms for the indicated state 
			 *                             for all non-alpha-numeric characters
			 */
			function createStateMappings(paramVal) {
				var terms =  paramVal.split(' ');
				var newTerms = '';

				//ISSUES: need to deal with case where user enters state name with spaces (i.e. new york)

				angular.forEach(terms, function(result) {
					//ok to use "in" because we know that state_hash is a nice, clean obeject
					if(result.toUpperCase() in state_hash) { //found a state term
						//add the alternative for the state indicates as well as the "nationwide" term
						result = '('+result+'+"'+state_hash[result.toUpperCase()]+'"+nationwide)';
					}
					//add each term back into the return value
					newTerms += newTerms ? ' '+result : result;
				});
				return newTerms;
			}



			/**
			 * Joins multiple terms (seperated by whitespace) via the OpenFDA "AND" 
			 * syntax (https://open.fda.gov/api/reference/#query-syntax)
			 * @param  {string} paramVal String with terms seperated by whitespace
			 * @return {string}          String with terms seperated by "+AND+"
			 */
			function createAndTerms(paramVal) {
				return paramVal.split(' ').join('+AND+');
			}

            /**
             * openFDA requires specific format for query parameters in API call.
             * This function creates and returns a query string compatible to openFDA API.
             * @param params        parameter object from form.
             * @returns {string}    openFDA compatible query string.
             */
			function createSearchString(params){
				var searchString = '',
					recall_StartDate = null,
					recall_EndDate = null,
					params = angular.copy(params);

				delete params.limit;
				delete params.skip;
				delete params.page;

				if (params && params.generalSearch){ //Google-style search
					searchString += createAndTerms(createStateMappings(
															sanitizeInputs(params.generalSearch)));
				} else {
					for(var key in params) {
						if(params.hasOwnProperty(key)) {
							if(key === 'recallStartDate'){
								recall_StartDate = sanitizeInputs(params[key]);
							}else if(key === 'recallEndDate'){
								recall_EndDate = sanitizeInputs(params[key]);
							}else{
								searchString += searchString ? '+AND+' : '';
								searchString += key + ':"' + sanitizeInputs(params[key]) + '"';
							}
						}
					}
					if(recall_StartDate || recall_EndDate){
						searchString += searchString ? 
										'+AND+' + generateDateQueryString(
																recall_StartDate, recall_EndDate) :
											generateDateQueryString(
																recall_StartDate, recall_EndDate);
					}
				}
				console.log('search string is:'+searchString);
				return searchString;
			}

            /**
             * Convert report_date query parameter into a format supported by openFDA API
             * @param startDate     recallStartDate from form input
             * @param endDate       recallEndDate from form input
             * @returns {string}    formatted report_date query parameter
             */
			function generateDateQueryString(startDate, endDate) {
				var dateQueryString = '';
				if(startDate){
					if(endDate){						
						dateQueryString += 'report_date:[' + dateToQueryString(startDate) +
												'+TO+' + dateToQueryString(endDate) + ']';
					}else{
						dateQueryString += 'report_date:' +  dateToQueryString(startDate);
					}
				}else if(endDate){
					dateQueryString += 'report_date:' + dateToQueryString(endDate);
				}
				return dateQueryString;
			}

            /**
             * Convert date to opnFDA compatible format
             * @param {Date}        date as Date Object.
             * @returns {string}    string in 'YYYYMMDD' format.                                                  ˙
             */
			function dateToQueryString(date){
				if(date){
					return $filter('date')(new Date(date), "yyyyMMdd");
				}
				return '';
			}

            /**
             *	Needs to pass URL as a whole string otherwise AngularJS will encode '+' sign
             *  which is not valid url for API endpoint
             * @param baseURL       Base URL for openFDA endpoint
             * @param params        Query parameter to be passed for GET request
             * @returns {string}    final openFDA API url combining baseURL and query parameters
             */
			function createURL(baseURL, params){
				var url = '';
				for(var key in params){
					if(params.hasOwnProperty(key)){
						//url += ( url ? '&' : '?' ) + key + '=' + params[key];
						//simplified now that we always have the api_key before these params
						url += '&' + key + '=' + params[key];
					}
				}
				return baseURL + '?api_key=' + apiKey + url;
			}

			return service;
		});

});