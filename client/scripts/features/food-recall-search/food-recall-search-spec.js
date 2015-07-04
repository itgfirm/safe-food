define(
	[	'angular',
		'angular-mocks',
		'features/food-recall-search/food-recall-search-controller'
	],
	function(angular){
		describe('FoodRecallSearchController', function(){
			var passPromise = true,
          mockOpenFDASvc,
					scope,
          $controller,
          $modalMock,
          $q;

      beforeEach( module('safeFoodApp'));
      beforeEach(function(){
        module(function($provide){
          $provide.factory('OpenFDAService', ['$q', function($q){
            function getData(){
              if(passPromise){
                return $q.when({});
              } else{
                return $q.reject({});
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
  																		_$q_, _OpenFDAService_){
					scope = _$rootScope_.$new();
          $controller = _$controller_;
          $q = _$q_;
          mockOpenFDASvc = _OpenFDAService_;
          $modalMock = jasmine.createSpyObj('$modal', [ 'open' ]);       
					$controller('FoodRecallSearchController',{
            $scope:scope,
            OpenFDAService: mockOpenFDASvc,
            $modal: $modalMock
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

    it('should show detailed recall information', function() {
      var item = { a: 'a' },
        defer = $q.defer(),
        modalScope = {};

      spyOn(scope, '$new');
      scope.$new.and.returnValue(modalScope);

      $modalMock.open.and.callFake(function() {
        return { result: defer.promise };
      });

      scope.viewDetails(item);

      expect(item.active).toEqual(true);
      expect(modalScope.details).toEqual(item);
      expect($modalMock.open).toHaveBeenCalledWith({
        scope: modalScope,
        size: jasmine.any(String),
        templateUrl: jasmine.any(String)
      });

      defer.resolve();
      scope.$apply();

      expect(item.active).toEqual(false);
    });

	});
});