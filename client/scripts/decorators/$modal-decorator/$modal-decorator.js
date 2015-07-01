define([ 'angular', 'app' ],
    function(angular, app) {

      app.config(function($provide) {
        $provide.decorator('$modal', function($delegate, $rootScope) {

          $delegate.openSimple = function(options) {
            var scope = $rootScope.$new(),
              modalInstance = null;

            scope.title = options.title;
            scope.content = options.content;

            modalInstance = $delegate.open({
              templateUrl: 'scripts/decorators/$modal-decorator/simple-modal.html', //jshint ignore:line
              scope: scope
            });

            return modalInstance;
          };

          return $delegate;
        });
      });

});


