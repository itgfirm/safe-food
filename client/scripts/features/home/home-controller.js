define([ 'angular', 'app', 
	'components/services/open-fda-service',
	'components/services/food-data-service'],
	function(angular, app) {

		app.controller('HomeController',
			function($scope, $location, $mdDialog,
				OpenFDAService, FoodDataService) {

			  $scope.searchNearMe = function(params) {
			  	OpenFDAService.searchNearMe(params)
			  		.then(function(data) {
			  			$scope.recallsNearMe = data;
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
				angular.element($window).bind('scroll', function(){
					if(element[0].getBoundingClientRect().top <= 40){
						element.addClass('transparent');
						angular.element(document.getElementById(attrs.nvabarSearchboxId))
							.removeClass('transparent');
					}else{
						element.removeClass('transparent');
						angular.element(document.getElementById(attrs.nvabarSearchboxId))
							.addClass('transparent');
					}					
				});
			};
		});
});