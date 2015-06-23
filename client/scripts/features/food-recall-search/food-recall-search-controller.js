define([ 'angular', 'app',
	'components/services/open-fda-service' ],
	function(angular, app) {

		app.controller('FoodRecallSearchController',
			function($scope, $mdDialog, OpenFDAService) {
				$scope.recallData = null;

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

				$scope.viewDetails = (function() {
					var config = {
						templateUrl: 'scripts/features/food-recall-search/food-recall-details.html'
					};

			    return function(item) {
			    	var dialog = null;
			    	scope = $scope.$new();
			    	scope.details = item;
			    	config.scope = scope;

						scope.hideDialog = function() {
							$mdDialog.hide(dialog);
						};
						
						dialog = $mdDialog.show(config);
			    };
				})();

				$scope.searchDisclaimer = function(params) {
						var confirm = $mdDialog.confirm()
				      .title('Disclaimer')
				      .content('Please note, search results prior to 2012 may be incomplete.')
				      .ariaLabel('Disclaimer')
				      .ok('Ok');
				    $mdDialog.show(confirm).then(function() {
				      $scope.search(params);
				    });
			  };

			  $scope.searchNearMe = function() {
			  	OpenFDAService.searchNearMe()
			  		.then(function(data) {
			  			$scope.recallData = data;
			  		});
			  };

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

				$scope.search();
				// $scope.showDisclaimer();

		});

});
