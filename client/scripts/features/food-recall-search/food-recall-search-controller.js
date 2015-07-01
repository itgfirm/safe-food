define([ 'angular', 'app',
	'components/services/open-fda-service/open-fda-service',
	'components/services/food-data-service/food-data-service',
	'components/services/simple-modal-service/simple-modal-service' ],
	function(angular, app) {

		app.controller('FoodRecallSearchController',
			function($scope, $stateParams, $modal,
				SimpleModalService, OpenFDAService, FoodDataService) {

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

        var currentSearch = {};

				$scope.search = function(params, isNew) {
					if(isNew) {
						params = params || {};
						params.page = 1;
						currentSearch = angular.copy(params);
					} else {
						currentSearch.page = params.page;
					}

					OpenFDAService.getData(currentSearch)
						.then(function(resp) {
							$scope.recallData = resp;
							if(!$scope.initialized) {
								$scope.initialized = true;
								$scope.base.searchParams = { page: $stateParams.page };
							}
						}, function(resp) {
							if(resp.error && resp.error.code === 'NOT_FOUND') {
								$scope.recallData = null;
							} else {
								params.page--;
							}
						});
				};

				$scope.viewDetails = function(item) {
					var scope = $scope.$new(),
					modalInstance = null;
					
					item.active = true;
					scope.details = item;

					modalInstance = $modal.open({
						templateUrl: 'scripts/features/\
							food-recall-search/food-recall-details.html',
						scope: scope,
						size: 'lg'
					});

					modalInstance.result.finally(function() {
						item.active = false;
					});

					scope.close = function() {
						modalInstance.close();
					};
				};

				$scope.base.search = function(params) {
					if (params && params.recallStartDate &&
						params.recallStartDate.getFullYear() < 2012) {

						SimpleModalService.open({
							title: 'Disclaimer',
							content: 'Please note, search results \
								prior to 2012 may be incomplete.'
						}).result.then(function(){
				      $scope.search(params, true);							
						});

					} else {
						$scope.search(params, true);
					}
			  };

			  // called from base
				// $scope.showDisclaimer();
				// $scope.search({ page: parseInt($stateParams.page) });
		}).
		directive('showNavSearchBox', function () {
			return {
				restrict: 'A',
				link: function (scope, iElement, iAttrs) {
					angular.element(document.getElementById(iAttrs.nvabarSearchboxId))
                        .removeClass('hidden');
				}
			};
		});
});
