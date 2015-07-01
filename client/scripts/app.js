define([
    'angular', 
    'angular-aria',
    'angular-touch',
    'angular-ui-router',
    'angular-ui-bootstrap',
    'angular-material',
    'ng-toast'
  ],
  function (angular) {
    var app = angular.module('safeFoodApp', [
      'ngAria',
      'ngTouch',
      'ui.router',
      'ui.bootstrap',
      'ngToast'
    ]);

    app.config(function($stateProvider, $urlRouterProvider,
      $httpProvider, ngToastProvider) {
      // $stateProvider.state('base', { abstract: true });
      $urlRouterProvider.otherwise('/');

      ngToastProvider.configure({
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        maxNumber: 3,
        className: 'danger',
        animation: 'slide'
      });

      $httpProvider.interceptors.push(function($q, $timeout, ngToast) {
        var interceptor = {},
          lastErrorInPeriod = null,
          timeoutPromise;

        interceptor.responseError = function(rejection) {
          if(lastErrorInPeriod !== rejection.status) {
            switch(rejection.status) {
              case 400:
                ngToast.create('Bad request! \
                  Please update your search and try again');
                break;
              case 429:
                ngToast.create('Too many requests! \
                 Please wait a few seconds and try again!');
                break;
              case 500:
                ngToast.create('Server error! Please try again!');
                break;
            }

            $timeout.cancel(timeoutPromise);
            
            timeoutPromise = $timeout(function() {
              lastErrorInPeriod = null;
            }, 1000);

            lastErrorInPeriod = rejection.status;
          }

          return $q.reject(rejection);
        };

        return interceptor;
      });

      //use for loading spinner on requests
      // $httpProvider.interceptors.push(function() {
      //   var interceptor = {},
      //     requestsOut = 0;
      //   interceptor.request =  function(config) {
      //     requestsOut++;
      //     return config;
      //   };

      //   interceptor.response = function(response) {
      //     requestsOut--;
      //     return response;
      //   };

      //   interceptor.responseError = function(rejection) {
      //     requestsOut--;
      //     if (canRecover(rejection)) {
      //       return responseOrNewPromise
      //     }
      //     return $q.reject(rejection);
      //   }
      // });



    });

    return app;
});
