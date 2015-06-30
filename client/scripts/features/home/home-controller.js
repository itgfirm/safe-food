define([ 'angular', 'app', 
	'components/services/open-fda-service',
	'components/services/food-data-service'],
	function(angular, app) {

		app.controller('HomeController',
			function($scope, $location, OpenFDAService, FoodDataService) {

		    	$scope.searchDisclaimer = function(params){
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