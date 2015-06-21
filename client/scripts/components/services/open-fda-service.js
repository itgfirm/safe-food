define([ 'angular', 'app' ],
	function(angular, app) {

		app.service('OpenFDAService', function($http, $q) {
			var service = {
				meta: null
			};

			service.getMeta = function() {
				var defer = $q.defer(),
					request = $http.get('https://api.fda.gov/food/enforcement.json?limit=1')
						.success(function(data) {
							delete data.meta.results;
							service.meta = data.meta;
							defer.resolve(angular.copy(service.meta));
						});
				return defer.promise;
			};

			return service;
		});

});