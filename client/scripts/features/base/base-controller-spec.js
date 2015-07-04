define(
  [ 'angular',
    'angular-mocks',
    'features/base/base-controller'
  ],
  function(angular){

    describe('BaseController', function() {
      var $scope, $q, $modalMock,
        OpenFDAServiceMock;

      beforeEach(function(){
        module('safeFoodApp');
        angular.mock.inject(function(_$rootScope_, _$controller_, _$q_) {
          $q = _$q_;
          $scope = _$rootScope_.$new();
          $modalMock = jasmine.createSpyObj('$modal', [ 'openSimple' ]);
          OpenFDAServiceMock = jasmine.
            createSpyObj('OpenFDAService', [ 'getMeta' ]);

          OpenFDAServiceMock.getMeta.and.callFake(function() {
            return $q.resolve({ disclaimer: 'disclaimer', more: 'more' });
          });

          $modalMock.openSimple.and.callFake(function() {
            return { result: $q.resolve() };
          });

          _$controller_('BaseController', {
            $scope: $scope,
            $modal: $modalMock,
            OpenFDAService: OpenFDAServiceMock 
          });
          $scope.$apply();
        });
      });

      it('should request openFDA food meta', function() {
        expect($scope.meta).toEqual(
          { disclaimer: 'disclaimer', more: 'more' }
        );
      });


      it('should show a disclaimer in a modal', function() {
        $scope.showDisclaimer();
        $scope.$apply();

        expect(OpenFDAServiceMock.getMeta.calls.count()).toEqual(3);
        expect($modalMock.openSimple.calls.count()).toEqual(2);
        expect($modalMock.openSimple).toHaveBeenCalledWith(
          { title: 'Disclaimer', content: 'disclaimer' }
        );
      });

    });
});