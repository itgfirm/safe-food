define([ 'angular', 'app',
	'components/services/location-service/location-service' ],
	function(angular, app) {

		app.service('OpenFDAService',
			function($http, $q, $filter, LocationService) {
			//TODO: These should come from the app's config file:
			var service = {},
				APIKEY = 'RQklIryrO1GobRvtpSV6W3gE6z3IXIinmqxiIiuB',
				BASEURL = 'https://api.fda.gov/food/enforcement.json',
				LIMIT = 25,
				STATEHASH;

			// I think an init should still be required
			// in order to make sure that the request is resolved
			// before certain search requests are made or
			// remove the request and change it to an angular
			// constant construct
			$http.get('./states_hash.json')
		    .success(function(data) {
	        STATEHASH = data;
		    })
		    .error(function() {
	        console.error('could not find state_hash.json');
		    });

			service.getMeta = function() {
				var defer = $q.defer(),
					params = {
						limit: 1
					};
				$http.get(createURL(BASEURL, params))
					.success(function(data) {
						delete data.meta.results;
						defer.resolve(data.meta);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};


			service.getData = function(params) {
				var defer = $q.defer();
				
				params = angular.copy(params || {});
				params.product_type = 'Food';
				
				sortQueryBuilder(params)
					.then(function(requiredRequests) {
						var requests = [];

						angular.forEach(requiredRequests.requests,
							function(requiredRequest) {
								var requestParams = {
									limit: requiredRequest.limit,
									skip: requiredRequest.skip
								};

								requestParams.search = createSearchString(requiredRequest);

								requests.push(
									$http.get(createURL(BASEURL, requestParams))
								);
							});

						$q.all(requests)
							.then(function(resolves) {
								var response = {
									meta: resolves[0].data.meta,
									results: []
								};

								response.meta.results = requiredRequests.meta;

								angular.forEach(resolves, function(resolve) {
									response.results = response.results
										.concat(resolve.data.results);
								});

								response.results = $filter('orderBy')
										(response.results, 'recall_initiation_date', true);

								angular.forEach(response.results, function(result) {
									result.recall_initiation_date = 
										convertFDADateString(result.recall_initiation_date);
									result.report_date = 
										convertFDADateString(result.report_date);
									//kinda false information and unnecessary
									result.last_updated = response.meta.last_updated;
								});
								defer.resolve(response);
							}, function(err){
								defer.reject(err);
							});

					}, function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			service.searchNearMe = function(params) {
				var defer = $q.defer();

				LocationService.getGeolocation()
					.then(function(coords) {
						LocationService.getStateFromCoords(coords.coords)
							.then(function(state) {
								params = params || {};
								params.distribution_pattern = state.short_name;

								service.getData(params)
									.then(function(recalls) {
										defer.resolve(recalls);
									}, function(err){
										defer.reject(err);
									});
							});
					}, function(error) {
						defer.reject(error);
					});

				return defer.promise;
			};

			//lacks elegance
			//elegance should be easy to attain here
			//but takes a bit of thought.
			function sortQueryBuilder(params) {
				var defer = $q.defer(),
					countRequestParams = {
						search: createSearchString(params),
						count: 'recall_initiation_date'
					},
					limit = params.limit || LIMIT;

				$http.get(createURL(BASEURL, countRequestParams))
					.success(function(data) {
						var counts = data.results,
							dates = createDateSegments(counts, params.page, true),
							requiredRequests = {
								meta: {},
								requests: []
							},
							baseRequestParams = angular.copy(params),
							tempRequest;

						delete baseRequestParams.skip;
						delete baseRequestParams.limit;
						delete baseRequestParams.count;
						delete baseRequestParams.recall_initiation_date;

						requiredRequests.meta = dates.meta;
						requiredRequests.meta.total = counts.reduce(function(prev, curr){
							return prev + curr.count;
						}, 0);


						delete dates.meta;

						for(var key in dates) {
							if(dates.hasOwnProperty(key)) {
								tempRequest = angular.copy(baseRequestParams);
								tempRequest.skip = dates[key].skip || 0;
								tempRequest.limit = dates[key].limit || limit;
								tempRequest.recall_initiation_date = dates[key].date;
								requiredRequests.requests.push(tempRequest);
							}
						}

						defer.resolve(requiredRequests);

					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;

				function createDateSegments(counts, num, reverse) {
					if(counts.length === 0) {
						return;
					}

					if (reverse) {
						counts.reverse();
					}

					var requiredSkip = ((num || 1) - 1) * limit,
						currentSkip = 0,
						currentLimit = 0,
						startSkip = 0,
						endLimit = 0,
						startIndex = -1,
						endIndex = -1,
						middleMin = null,
						middleMax = null,
						dates = {
							meta: {
								limit: limit,
								skip: requiredSkip
							}
						},
						i = 0,
						iterComp = counts.length;

					for(;i < iterComp && currentSkip <= requiredSkip; i++) {
						currentSkip += counts[i].count;
						startIndex = i;
					}

					startSkip = currentSkip > requiredSkip  ?
						counts[startIndex].count - (currentSkip - requiredSkip) : 0;

					currentLimit = currentSkip - requiredSkip;

					if(currentLimit < limit) {
						for(;i < iterComp && currentLimit < limit; i++) {
							currentLimit += counts[i].count;
							endIndex = i;
						}
	
						endLimit = currentLimit > limit ?
							counts[endIndex].count - (currentLimit - limit) :
							limit;
					}

					startIndex = startIndex !== -1 ? startIndex : 0;

					dates.start = {
						date: new Date(convertFDADateString(counts[startIndex].time)),
						skip: startSkip
					};

					if(endIndex !== -1) {
						dates.end = {
							date: new Date(convertFDADateString(counts[endIndex].time)),
							limit: endLimit
						};

						if(endIndex - startIndex > 1) {
							middleMin = new Date(reverse ? dates.end.date : dates.start.date);
							middleMax = new Date(reverse ? dates.start.date : dates.end.date);

							dates.middle = {
								date: [ middleMin.setDate(middleMin.getDate() + 1),
									middleMax.setDate(middleMax.getDate() - 1) ]
							};
						}
					}
					return dates;
				}
			}



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
			
				if (!paramVal) return paramVal;
				
				//replacing with spaces so that it can be tokenized as words later.
				var result = paramVal.replace(/[^a-zA-Z0-9 ]/g, ' ');
				result = result.trim().replace(/\s+/g, ' ');
				return result;
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

				//ISSUES: need to deal with case where 
				//user enters state name with spaces (i.e. new york)

				angular.forEach(terms, function(result) {
					//ok to use "in" because we know that
					//STATEHASH is a nice, clean obeject
					if(result.toUpperCase() in STATEHASH) { //found a state term
						//add the alternative for the state indicates
						//as well as the "nationwide" term
						result = '('+result+'+'+
							encodeURIComponent(STATEHASH[result.toUpperCase()])+
							'+nationwide)';
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
			 * This function creates and returns a 
			 * query string compatible to openFDA API.
			 * @param params        parameter object from form.
			 * @returns {string}    openFDA compatible query string.
			 */
			function createSearchString(params){
				var	searchString = '';
				params = angular.copy(params);

				delete params.limit;
				delete params.skip;
				delete params.page;

				if (params) {
					if(params.generalSearch) { //Google-style search
						searchString += createAndTerms(createStateMappings(
							sanitizeInputs(params.generalSearch))) + '+AND+';
						delete params.generalSearch;
					}

					if(params.recall_initiation_date) {
            var recallDateQuery = generateDateQueryString(
            	params.recall_initiation_date
            );

            searchString += recallDateQuery ?
            	recallDateQuery + '+AND+' : '';
            delete params.recall_initiation_date;
					}

	        if(params.status) {
            var statusQueryString = 'status:(';
            
            angular.forEach(params.status, function(list) {
              statusQueryString += '"' + list + '"+';
            });

            statusQueryString = statusQueryString.
            	substr(0, statusQueryString.length - 1);

            searchString += statusQueryString + ')+AND+';
            delete params.status;
	        }

	        if(params.distribution_pattern) {
						searchString += 'distribution_pattern:' +
							createAndTerms(
								createStateMappings(
									sanitizeInputs(params.distribution_pattern)
								)
							) + '+AND+';
						delete params.distribution_pattern;
	        }

					for(var key in params) {
						if(params.hasOwnProperty(key)) {
							searchString += key + ':"' +
								sanitizeInputs(params[key]) + '"+AND+';
						}
					}
	
					searchString = searchString.substr(0, searchString.length - 5);
				}
				return searchString;
			}

			/**
			 * Convert recall_initiation_date query parameter
			 * into a format supported by openFDA API
			 * @param initiationDate    Number Of days to search back in past
			 * @returns {string}        formatted report_date query parameter
			 */
			function generateDateQueryString(initiationDate) {
				var dateQueryString = '';

	    	if(initiationDate){
	        if(initiationDate.dateOffset){
	        	var endDate = new Date(),
		          startDate = new Date();
	          startDate.setDate(startDate.getDate()-initiationDate.dateOffset);
	          initiationDate = [ startDate, endDate ];
      		}

      		if(angular.isArray(initiationDate)) {
      			//assumes date array
	          dateQueryString += '[' +
	          	dateToQueryString(new Date(initiationDate[0])) +
	          	'+TO+' + dateToQueryString(new Date(initiationDate[1])) +
	          	']';
      		} else if(angular.isDate(initiationDate)) {
      			dateQueryString += dateToQueryString(initiationDate);
      		} else if(angular.isString(initiationDate)) {
      			//assumes proper formatting
      			dateQueryString += initiationDate;
      		}

      		if(dateQueryString) {
      			dateQueryString = 'recall_initiation_date:' + dateQueryString;
      		}
    		}
				return dateQueryString;
			}

			/**
			 * Convert date to opnFDA compatible format
			 * @param {Date}        date as Date Object.
			 * @returns {string}    string in 'YYYYMMDD' format.
			 */
			function dateToQueryString(date){
				if(date){
					return $filter('date')(new Date(date), 'yyyyMMdd');
				}
				return '';
			}

			/**
			 * Needs to pass URL as a whole string otherwise AngularJS
			 * will encode '+' sign which is not valid url for API endpoint
			 * @param baseURL       Base URL for openFDA endpoint
			 * @param params        Query parameter to be passed for GET request
			 * @returns {string}    final openFDA API url combining baseURL 
			 *											and query parameters
			 */
			function createURL(baseURL, params){
				var url = '';
				for(var key in params){
					if(params.hasOwnProperty(key)){
						url += '&' + key + '=' + params[key];
					}
				}
				return baseURL + '?api_key=' + APIKEY + url;
			}

			return service;
		});

});