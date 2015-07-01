define(['angular', 'app',
	'components/services/simple-modal-service/simple-modal-controller' ],
	function(angular, app){
		app.service('SimpleModalService', function($rootScope, $modal) {
			var service = {};

		  service.open = function(options) {
		  	var scope = $rootScope.$new();

		  	scope.title = options.title;
		  	scope.content = options.content;

		    return $modal.open({
		      templateUrl: 'scripts/components/services/simple-modal-service/simple-modal.html', //jshint ignore:line
		      controller: 'SimpleModalController',
		      scope: scope,
		      backdrop: 'static'
		    });
		  };

		  return service;
		});
});