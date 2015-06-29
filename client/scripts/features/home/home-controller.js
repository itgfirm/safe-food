define([ 'angular', 'app', 
	'components/services/open-fda-service',
	'components/services/food-data-service'],
	function(angular, app) {

		app.controller('HomeController', ['$scope', '$http', '$location', 'OpenFDAService', 'FoodDataService', 
			function($scope, $http, $location, OpenFDAService, FoodDataService) {
		    	$scope.appName = 'Safe Food App';

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
		}])
		.directive("pageScroll", function($window){
			return function(scope, element, attrs){			
				angular.element($window).bind("scroll", function(){
					if(element[0].getBoundingClientRect().top <= 40){
						element.addClass('hideInput');
						angular.element(document.getElementById(attrs.nvabarSearchboxId)).removeClass('hideInput');
					}else{
						element.removeClass('hideInput');
						angular.element(document.getElementById(attrs.nvabarSearchboxId)).addClass('hideInput');
					}					
				});
			};
		});
});