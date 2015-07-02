define(
  [ 'angular',
    'angular-mocks',
    'components/services/location-service/location-service'
  ],
  function(angular){

    describe('Location Service Unit Tests', function() {

      var $q,
        $rootScope,
        $httpBackend,
        LocationService;

      beforeEach(function(){
        module('safeFoodApp');

        angular.mock.inject(function (_$rootScope_ ,_$q_,
          _$httpBackend_, _LocationService_){
            $rootScope = _$rootScope_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            LocationService = _LocationService_;
        });
      });

      afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should return geocoords when geolocation is available', function() {
        window.navigator.geolocation = {
          getCurrentPosition: function() {}
        };

        spyOn(window.navigator.geolocation, 'getCurrentPosition').
          and.callFake(function(scb) {
            scb({ longitude: 1, latitude: 0 });
          });

        LocationService.getGeolocation().
          then(function(coords) {
            expect(coords).toEqual({ longitude: 1, latitude: 0 });
          });

        $rootScope.$apply();
      });

      it('should return an error when geolocation is unavailable',
        function() {
          window.navigator.geolocation = null;

          LocationService.getGeolocation().
            then(function() {},
              function(err) {
                expect(err.code).toEqual(0);
            });

          $rootScope.$apply();
      });

      it('should return a state', function() {
        $httpBackend.expectGET(/.*latlng=1,0.*/).
          respond({
            status: 'OK',
            results: [{
              address_components: [{
                short_name: 'AL',
                types: [ 'administrative_area_level_1' ]
              }]
            }]
          });

        LocationService.getStateFromCoords({ latitude: 1, longitude: 0 }).
          then(function(state) {
            expect(state).toEqual({ short_name: 'AL' });
          });

        $httpBackend.flush();
      });

    });
});