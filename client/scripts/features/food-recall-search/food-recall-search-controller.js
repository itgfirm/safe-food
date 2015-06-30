define([ 'angular', 'app',
	'components/services/open-fda-service',
	'components/services/food-data-service' ],
	function(angular, app) {

		app.controller('FoodRecallSearchController',
			function($scope, $mdDialog, $stateParams,
				OpenFDAService, FoodDataService) {
				$scope.recallData = FoodDataService.getFoodSearchData();
				$scope.initialized = FoodDataService.isInitialized();
        //TODO Move arrays to config file.
        $scope.healthHazardLevels = ['Class I', 'Class II', 'Class III'];
        $scope.dateRange = [
            {'id':0, 'name':'Last 7 Days', 'dateOffset':6},
            {'id':1, 'name':'Last 30 Days','dateOffset':29},
            {'id':2, 'name':'Last 1 Year', 'dateOffset':364},
            {'id':3, 'name':'All Records', 'dateOffset':null}
        ];
        $scope.statusList = ['Ongoing', 'Pending', 'Completed', 'Terminated'];
        $scope.base = $scope.base || {};

				$scope.search = function(params) {
					OpenFDAService.getData(params)
						.then(function(resp) {
							$scope.recallData = resp;
							if(!$scope.initialized) {
								$scope.initialized = true;
								$scope.base.searchParams = { page: $stateParams.page };
							}
						}, function(resp) {
							console.log(resp.error);
							if(resp.error && resp.error.code === 'NOT_FOUND') {
								$scope.recallData = null;
							}
						});
				};

				$scope.viewDetails = (function() {
					var config = {
						templateUrl: 'scripts/features/\
							food-recall-search/food-recall-details.html'
					};

			    return function(item) {
			    	var dialog = null,
			    		scope = $scope.$new();

			    	scope.details = item;
			    	config.scope = scope;
			    	item.active = true;

						scope.hideDialog = function() {
							$mdDialog.cancel(dialog);
						};

						dialog = $mdDialog.show(config)
							.finally(function(){
								item.active = false;
							});

			    };
				})();

				$scope.base.search = function(params) {
					if (params && params.recallStartDate &&
						params.recallStartDate.getFullYear() < 2012) {
						var confirm = $mdDialog.alert()
				      .title('Disclaimer')
				      .content('Please note, \
				      	search results prior to 2012 may be incomplete.')
				      .ariaLabel('Disclaimer')
				      .ok('Ok');
				    $mdDialog.show(confirm).then(function() {
				      $scope.search(params);
				    });
					} else {
						$scope.search(params);
					}
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

				$scope.showDisclaimer();
				// $scope.search({ page: parseInt($stateParams.page) });
		});

});
