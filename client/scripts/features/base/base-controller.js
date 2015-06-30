define([ 'angular', 'app', 
	'components/services/open-fda-service' ],
	function(angular, app) {

		app.controller('BaseController',
			function($scope, $location, $mdDialog, OpenFDAService) {
				$scope.meta = null;

				OpenFDAService.getMeta().then(function(meta) {
					$scope.meta = meta;
				});

				$scope.showDisclaimer = (function() {
					var disclaimerDialog = $mdDialog.alert()
						.title('Disclaimer')
						.ariaLabel('Disclaimer')
				    .ok('Ok'),
						metaDataPromise = OpenFDAService.getMeta(),
						displaying = false;

					return function() {
						return metaDataPromise.then(function(meta) {
							if(!displaying) {
								displaying = true;
								disclaimerDialog.content(meta.disclaimer);
								$mdDialog.show(disclaimerDialog)
									.finally(function() {
										displaying = false;
									});
							}
						});
					};
				})();

	    	$scope.base = {
	    		search: function(params) {
	    			// fill in child controller
	    			params = {};
	    		}
	    	};

		});
});