define(
  [ 'angular',
    'angular-mocks',
    'features/home/home-controller'
  ],
  function(angular){

    describe('HomeController', function() {
      var $scope, $q, $stateMock, $modalMock,
        OpenFDAServiceMock;

      beforeEach(function(){
        module('safeFoodApp');

        angular.mock.inject(function(_$rootScope_, _$controller_, _$q_) {
          $q = _$q_;
          $scope = _$rootScope_.$new();
          $stateMock = jasmine.createSpyObj('$state', [ 'go' ]);
          $modalMock = jasmine.createSpyObj('$modal', [ 'open' ]);
          OpenFDAServiceMock = jasmine.
            createSpyObj('OpenFDAService', [ 'searchNearMe' ]);

          OpenFDAServiceMock.searchNearMe.and.callFake(function() {
            return $q.resolve('food recalls near me');
          });

          _$controller_('HomeController', {
            $scope: $scope,
            $modal: $modalMock,
            $state: $stateMock,
            OpenFDAService: OpenFDAServiceMock 
          });
          $scope.$apply();
        });
      });

      it('should get the 5 most recent recalls in user\'s state', function() {
        $scope.searchNearMe({ limit: 5 });

        expect($scope.recallsNearMe).toEqual('food recalls near me');

        expect(OpenFDAServiceMock.searchNearMe.calls.count()).toEqual(2);
        expect(OpenFDAServiceMock.searchNearMe).
          toHaveBeenCalledWith({ limit: 5 });
      });

      it('should redirect with params on search', function() {
        var params = { a: 'a', b: 'b' };
        $scope.base.search(params);

        expect($stateMock.go).
          toHaveBeenCalledWith('base.food-recall-search',
            { searchParams: params });
      });

      it('should show detailed recall information', function() {
        var item = { a: 'a' },
          defer = $q.defer(),
          modalScope = {};

        spyOn($scope, '$new');
        $scope.$new.and.returnValue(modalScope);

        $modalMock.open.and.callFake(function() {
          return { result: defer.promise };
        });

        $scope.viewDetails(item);

        expect(item.active).toEqual(true);
        expect(modalScope.details).toEqual(item);
        expect($modalMock.open).toHaveBeenCalledWith({
          scope: modalScope,
          size: jasmine.any(String),
          templateUrl: jasmine.any(String)
        });

        defer.resolve();
        $scope.$apply();

        expect(item.active).toEqual(false);
      });

    });
});