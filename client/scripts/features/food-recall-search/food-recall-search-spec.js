define(
	[	'angular',
		'angular-mocks',
		'features/food-recall-search/food-recall-search-controller'
	],
	function(angular){
		describe('FoodRecallSearchController Unit Test', function(){
			var passPromise,
          mockOpenFDASvc,
					FoodRecallSearchController,
					scope,
          $controller;

      beforeEach( module('safeFoodApp'));
      beforeEach(function(){
        module(function($provide){
          $provide.factory('OpenFDAService', ['$q', function($q){
            function getData(){
              if(passPromise){
                return $q.when();
              } else{
                return $q.reject();
              }
            }
            return{
              getData: getData
            };
          }]);
        });        
      });  

			beforeEach(function(){
  			angular.mock.inject(function(_$rootScope_, _$controller_, 
  																			_OpenFDAService_){
					scope = _$rootScope_.$new();
          $controller = _$controller_;
          mockOpenFDASvc = _OpenFDAService_;          
					FoodRecallSearchController = 
									$controller('FoodRecallSearchController',{
            $scope:scope,
            OpenFDAService: mockOpenFDASvc
          });
          spyOn(mockOpenFDASvc, 'getData').and.callThrough();
				});
			});

    it('Initially, variable initialized is set to false', function() {
      expect(scope.initialized).toBe(false);
		});

    it('statusList is defined',function(){
      expect(scope.statusList).toBeDefined();
    });

    it('Calls method search', function(){
      scope.search(null, true);
      expect(mockOpenFDASvc.getData).toHaveBeenCalled();
    });

	});
});