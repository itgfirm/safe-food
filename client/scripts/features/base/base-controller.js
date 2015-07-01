define([ 'angular', 'app', 
	'components/services/open-fda-service/open-fda-service' ],
	function(angular, app) {

		app.controller('BaseController',
			function($scope, $modal, OpenFDAService) {
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
							$modal.openSimple({
								title: 'Disclaimer',
								content: meta.disclaimer
							});
						});
				};

				$scope.showDisclaimer();



		});
});