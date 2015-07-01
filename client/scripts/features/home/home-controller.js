define([ 'angular', 'app', 
	'components/services/open-fda-service/open-fda-service',
	'components/services/food-data-service/food-data-service'],
	function(angular, app) {

		app.controller('HomeController',
			function($scope, $location, $modal,
				OpenFDAService, FoodDataService) {

			  $scope.searchNearMe = function(params) {
			  	OpenFDAService.searchNearMe(params)
			  		.then(function(data) {
			  			$scope.recallsNearMe = data;
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


	    	$scope.base.search = function(params){
	    		OpenFDAService.getData(params)
					.then(function(resp) {
						FoodDataService.setFoodSearchData(resp);
						FoodDataService.setInitialized(true);
						$location.path('/food-recall-search');
					}, function(resp) {
						if(resp.error && resp.error.code === 'NOT_FOUND') {
							FoodDataService.setFoodSearchData(null);
							FoodDataService.setInitialized(true);								
						}
						$location.path('/food-recall-search');
					});		    		
	    	};

				$scope.searchNearMe({ limit: 5 });

		})
		.directive('pageScroll', function($window){
			return function(scope, element, attrs){	
				angular.element(document.getElementById(attrs.nvabarSearchboxId))
        	.addClass('hidden');

				angular.element($window).bind('scroll', function(){
					if(element[0].getBoundingClientRect().top <= 40){
						element.addClass('transparent');
						angular.element(document.getElementById(attrs.nvabarSearchboxId))
							.removeClass('hidden');
					}else{
						element.removeClass('transparent');
						angular.element(document.getElementById(attrs.nvabarSearchboxId))
							.addClass('hidden');
					}					
				});
				// Event should be unbound when view is destroyed.
				scope.$on('$destroy', function(){				
					angular.element($window).unbind('scroll');
				});
			};
		});
});