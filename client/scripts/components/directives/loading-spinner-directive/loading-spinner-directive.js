define([ 'angular', 'app' ],
  function(angular, app){
    app.config(function($httpProvider) {
      $httpProvider.interceptors.push(function($q, LoadingSpinnerService) {
        var interceptor = {};

        interceptor.request =  function(config) {
          LoadingSpinnerService.add();
          return config;
        };

        interceptor.response = function(response) {
          LoadingSpinnerService.remove();
          return response;
        };

        interceptor.responseError = function(rejection) {
          LoadingSpinnerService.remove();            
          return $q.reject(rejection);
        };

        return interceptor;
      });
    })
    .service('LoadingSpinnerService', function($rootScope, $timeout) {
      var service = {},
        loadingCount = 0,
        stopSpinnerTimeout = null;

      service.add = function() {
        loadingCount++;

        $timeout.cancel(stopSpinnerTimeout);
        $rootScope.$emit('loading', true);          
      };

      service.remove = function() {
        loadingCount--;
        
        if(loadingCount === 0) {
          $timeout.cancel(stopSpinnerTimeout);

          stopSpinnerTimeout = $timeout(function() {
            $rootScope.$emit('loading', false);
          }, 100);
        }
      };

      return service;
    })
    .controller('LoadingSpinnerController', function($scope) {
      $scope.$root.$on('loading', function(e, loading) {
        $scope.loading = loading;
      });
    })
    .directive('loadingSpinner', function() {
      return {
        restrict: 'AE',
        controller: 'LoadingSpinnerController',
        templateUrl: 'scripts/components/directives/loading-spinner-directive/loading-spinner.html' //jshint ignore: line
      };
    });
});