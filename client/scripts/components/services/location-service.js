define([ 'angular', 'app' ],
	function(angular, app) {

		app.service('LocationService', function($http, $q) {
			var service = { meta: null },
				baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json',
				dataTranslationKeys = {
					'state': 'administrative_area_level_1'
				};

			service.getGeolocation = function() {
				var defer = $q.defer();

				if(navigator && navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(defer.resolve, defer.reject);
				} else {
					defer.reject({ UNSUPPORTED: true });
				}

				return defer.promise;
			};

			service.getStateFromCoords = function(coords) {
				var defer = $q.defer(),
					params = {
						latlng: coords.latitude + ',' + coords.longitude ,
						sensor: false
					};

				$http.get(baseUrl, { params: params })
					.success(function(data) {
						if(data.status !== 'OK') {
							defer.reject(data.status);
							return;
						}

						var state = null,
							translationKey = dataTranslationKeys.state;
						angular.forEach(data.results, function(result) {
							angular.forEach(result.address_components, function(component) {
								if(component.types.indexOf(translationKey) !== -1) {
									state = component;
									delete state.types;
								}
							});
						});


						state ? defer.resolve(state) : defer.reject(state);
					});

				return defer.promise;
			};


			return service;
		});

});