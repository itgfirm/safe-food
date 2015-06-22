define([ 'angular', 'app',
	'components/services/open-fda-service' ],
	function(angular, app) {

		app.controller('FoodRecallSearchController',
			function($scope, $mdDialog, OpenFDAService) {
				$scope.recallData = null;

				$scope.search = function(params) {
					OpenFDAService.getData()
						.then(function(data) {
							$scope.recallData = data;
						});
				};

				$scope.search();

				$scope.showDisclaimer = (function() {
					var disclaimerDialog = $mdDialog.alert()
						.title('Disclaimer')
						.ariaLabel('Disclaimer')
				    .ok('Got it!'),
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

				$scope.showDisclaimer();

		});

});