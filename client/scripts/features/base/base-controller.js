define([ 'angular', 'app', 
	'components/services/open-fda-service/open-fda-service',
	'components/services/simple-modal-service/simple-modal-service' ],
	function(angular, app) {

		app.controller('BaseController',
			function($scope, $location, SimpleModalService, OpenFDAService) {
				$scope.meta = null;
	    	$scope.base = {
	    		search: function(params) {
	    			// fill in child controller
	    			params = {};
	    		}
	    	};
	    	
				OpenFDAService.getMeta().then(function(meta) {
					$scope.meta = meta;
				});

				$scope.showDisclaimer = function() {
					OpenFDAService.getMeta().
						then(function(meta) {
							SimpleModalService.open({
								title: 'Disclaimer',
								content: meta.disclaimer
							});
						});
				};

				$scope.showDisclaimer();



		});
});