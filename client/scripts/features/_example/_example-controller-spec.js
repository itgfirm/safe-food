// define(
// 	[ 'angular',
// 		'angular-mocks',
// 		'features/_example/_example-controller'
// 	],
// 	function(angular){

// 		describe('_ExampleController', function(){
			
// 			beforeEach(module('safeFoodApp'));

// 			var controller,
// 				scope;

// 			beforeEach(inject(function ($controller, $rootScope) {
// 				scope = $rootScope.$new();
// 				$controller('_ExampleController', { $scope: scope });
// 			}));

// 			it('should verify the appName variable', function(){
// 				expect(scope.appName).toBe('Safe Food App');
// 			});
// 		});
// });