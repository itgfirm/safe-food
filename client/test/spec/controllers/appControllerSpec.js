'use strict';

describe('Controller: theController', function(){
	
	beforeEach(module('safeFoodApp'));

	var theController,
		scope;

	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		theController = $controller('theController', {
			$scope: scope
		});
	}));

	it('should verify the appName variable', function(){
		expect(scope.appName).toBe('Safe Food App');
	});
});
