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
					params = { search: createSearchString(params) };

				params.limit = params.limit || 25;

				$http.get(createURL(baseUrl, params))
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
					month = dateString.substr(4, 2)
					date = dateString.substr(6, 2);

				return  month + '/' + date + '/' + year;
			};

			/**
			 * This function is required because the OpenFDA API queries throw errors 
			 * when they get certain characters 
			 * and they do NOT support URL encoding of said characters
			 * @param  {string} paramVal the raw input from the form
			 * @return {string}          the "cleaned" input - swapping spaces for all non-alpha-numeric characters
			 */
			function stripIllegalchars(paramVal) {

				//replacing with spaces so that it can be tokenized as words later.
				return paramVal.replace(/[^a-zA-Z0-9 ]/g, ' ');

				//rather than whitelist we can try a blacklist:
				// return paramVal.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' ');
			};


			/**
			 * [createStateMap description]
			 * @param  {[type]} paramVal [description]
			 * @return {[type]}          [description]
			 */
			function createStateMappings(paramVal) {
				var terms =  paramVal.split(' ');
				var newTerms = '';

				angular.forEach(terms, function(result) {
					//ok to use "in" because we know that state_hash is a nice, clean obeject
					if(result.toUpperCase() in state_hash) { //found a state term
						//add the alternative for the state indicates as well as the "nationwide" term
						var result = '('+result+'+'+state_hash[result.toUpperCase()]+'+nationwide)';
					}
					//add each term back into the return value
					newTerms += newTerms ? ' '+result : result;
				});
				return newTerms;
			};



			/**
			 * Joins multiple terms (seperated by whitespace) via the OpenFDA "AND" 
			 * syntax (https://open.fda.gov/api/reference/#query-syntax)
			 * @param  {string} paramVal String with terms seperated by whitespace
			 * @return {string}          String with terms seperated by "+AND+"
			 */
			function createAndTerms(paramVal) {
				return paramVal.split(' ').join('+AND+');
			};

			function createSearchString(params){
				var searchString = '',
					recall_StartDate = null,
					recall_EndDate = null;

				if (params && params.generalSearch){ //Google-style search
					searchString += createAndTerms(createStateMappings(stripIllegalchars(params.generalSearch)));
				} else {

					for(key in params) {
						if(params.hasOwnProperty(key)) {
							if(key === 'recallStartDate'){
								recall_StartDate = params[key];
							}else if(key === 'recallEndDate'){
								recall_EndDate = params[key];
							}else{
								searchString += searchString ? '+AND+' : '';				
								searchString += key + ':"' + params[key] + '"';
							}							
						}
					}
					if(recall_StartDate || recall_EndDate){
						searchString += searchString ? '+AND+' + generateDateQueryString(recall_StartDate, recall_EndDate) :
											generateDateQueryString(recall_StartDate, recall_EndDate);
					}		

				}


				console.log('search string is:'+searchString);
				return searchString;
			};

			function generateDateQueryString(startDate, endDate) {
				var dateQueryString = '';
				if(startDate){
					if(endDate){						
						dateQueryString += 'report_date:[' + $filter('date')(new Date(startDate), "yyyyMMdd")
										+ '+TO+' + $filter('date')(new Date(endDate), "yyyyMMdd") + ']';  
					}else{
						dateQueryString += 'report_date:' + $filter('date')(new Date(startDate), "yyyyMMdd");
					}
				}else if(endDate){
					dateQueryString += 'report_date:' + $filter('date')(new Date(endDate), "yyyyMMdd");
				}
				return dateQueryString;
			}

			/*
			 *	Needs to pass URL as a whole string otherwise AngularJS will encode '+' sign
			 *  which is not valid url for API endpoint
			 */
			function createURL(baseURL, params){
				var url = '';
				for(key in params){
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