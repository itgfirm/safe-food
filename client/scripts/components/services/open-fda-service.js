define([ 'angular', 'app',
	'components/services/location-service' ],
	function(angular, app) {

		app.service('OpenFDAService', function($http, $q, LocationService) {
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
				var defer = $q.defer(),
					params = { search: createSearchString(params) };

				params.limit = params.limit || 25;

				$http.get(baseUrl, { params: params })
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
					date = dateString.substr(4, 2)
					month = dateString.substr(6, 2);

				return month + '/' + date + '/' + year;
			};

			function createSearchString(params){
				var searchString = '';

				for(key in params) {
					if(params.hasOwnProperty(key)) {
						searchString += key + ':"' + params[key] + '"';
					}
				}

				return searchString;
			};

			return service;
		});

});