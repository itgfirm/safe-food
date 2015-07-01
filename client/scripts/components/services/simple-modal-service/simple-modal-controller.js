define([ 'angular', 'app' ],
	function(angular, app) {

		app.controller('SimpleModalController',
			function($scope, $modalInstance) {
			  $scope.ok = function () {
			    $modalInstance.close('ok');
			  };

			  $scope.cancel = function () {
			    $modalInstance.dismiss('cancel');
			  };
		});
});