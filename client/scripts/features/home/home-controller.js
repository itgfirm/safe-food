define([ 'angular', 'app', 
	'components/services/open-fda-service/open-fda-service' ],
	function(angular, app) {

		app.controller('HomeController',
			function($scope, $state, $modal, OpenFDAService) {
			  $scope.base = $scope.base || {};
			  $scope.nearMeRequestStatus = 4;

			  $scope.searchNearMe = function(params) {
			  	$scope.nearMeRequestStatus = 4;
			  	OpenFDAService.searchNearMe(params)
			  		.then(function(data) {
			  			$scope.nearMeRequestStatus = 5;
			  			$scope.recallsNearMe = data;
			  		}, function(err) {
			  			$scope.nearMeRequestStatus = err.code;
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
				};


	    	$scope.base.search = function(params){
	    		$state.go('base.food-recall-search', { searchParams: params });
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
