define([ 'angular', 'app',
	'components/services/open-fda-service' ],
	function(angular, app) {

		app.controller('FoodRecallSearchController',
			function($scope, $mdDialog, OpenFDAService) {
				$scope.recallData = null;
				$scope.lastDataUpdatedDate = null;

				$scope.search = function(params) {
					OpenFDAService.getData(params)
						.then(function(data) {
							$scope.recallData = data;
						},
						function(err){
							if(err.error.code === 'NOT_FOUND'){
								var searchErrorMsg = $mdDialog.alert()
														.title('Record(s) Not Found !')
														.content('Your search did not return any results. Please modify your search criteria and try again !').ok('Close');
								$mdDialog.show(searchErrorMsg)
							}
						});
				};

				$scope.search();

				$scope.searchDisclaimer = function(params) {
						var confirm = $mdDialog.confirm()
				      .title('Disclaimer')
				      .content('Please note, search results prior to 2012 may be incomplete.')
				      .ariaLabel('Disclaimer')
				      .ok('Got it!');
				    $mdDialog.show(confirm).then(function() {
				      $scope.search(params);
				    });
			  };

				$scope.showDisclaimer = (function() {
					var disclaimerDialog = $mdDialog.alert()
						.title('Disclaimer')
						.ariaLabel('Disclaimer')
				    .ok('Got it!'),
						metaDataPromise = OpenFDAService.getMeta(),
						displaying = false;

					return function() {
						return metaDataPromise.then(function(meta) {
							$scope.lastDataUpdatedDate = meta.last_updated;
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
