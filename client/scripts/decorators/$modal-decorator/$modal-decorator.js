define([ 'angular', 'app',
  'decorators/$modal-decorator/simple-modal-controller' ],
    function(angular, app) {

      app.config(function($provide) {
        $provide.decorator('$modal', function($delegate, $rootScope) {
          $delegate.openSimple = function(options) {
            var scope = $rootScope.$new();

            scope.title = options.title;
            scope.content = options.content;

            return $delegate.open({
              templateUrl: 'scripts/decorators/$modal-decorator/simple-modal.html', //jshint ignore:line
              controller: 'SimpleModalController',
              scope: scope
            });          
          };

          return $delegate;
        });
      });

});


