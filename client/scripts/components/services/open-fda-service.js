define([ 'angular', 'app' ],
	function(angular, app) {

		app.service('OpenFDAService', function($http, $q) {
			var service = { meta: null },
				baseUrl = 'https://api.fda.gov/food/enforcement.json';

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
				var defer = $q.defer();
				
				var queryString = params ? createSearchString(params) : null;
				var limit = (params  && params.limit ) ? params.limit : 100;
				queryString = queryString ? queryString+'&limit='+limit : '?limit='+100;

				$http.get(baseUrl+queryString)
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

			function convertFDADateString(dateString) {
				if(!dateString) {
					return null;
				}

				var year = dateString.substr(0, 4),
					date = dateString.substr(4, 2)
					month = dateString.substr(6, 2);

				return month + '/' + date + '/' + year;
			};

			function createSearchString(params){
				var searchkeys = Object.keys(params),
					paramString = null;

				for (key in searchkeys) {
					paramString = paramString ? paramString+'+AND+'+searchkeys[key]+':"'+params[searchkeys[key]]+'"' : '?search='+searchkeys[key]+':"'+params[searchkeys[key]]+'"'
				};
				return paramString;
			};

			return service;
		});

});