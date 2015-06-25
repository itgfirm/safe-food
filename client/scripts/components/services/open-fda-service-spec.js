define(
  [ 'angular',
    'angular-mocks',
    'components/services/open-fda-service'
  ],
  function(angular){

    describe('OpenFDA Service Unit Tests', function() {

        var OpenFDAService, $q, $timeout; 

        beforeEach(function(){
            module('safeFoodApp');

            inject(function (_$q_, _$timeout_, _OpenFDAService_){
              //console.log('_OpenFDAService_',_OpenFDAService_);
              OpenFDAService = _OpenFDAService_;
              $q = _$q_;
              $timeout = _$timeout_;
            });
        });


        it('sanitizes bad inputs', function() {
            expect(OpenFDAService.sanitizeInputs('That\'s it!'))
              .toBe('That s it');
            expect(OpenFDAService.sanitizeInputs('eggs, and     bacon'))
              .toBe('eggs and bacon');
            expect(OpenFDAService.sanitizeInputs(null))
              .toBe(null);
            expect(OpenFDAService.sanitizeInputs(''))
              .toBe('');
            expect(OpenFDAService.sanitizeInputs(' '))
              .toBe('');
            expect(OpenFDAService.sanitizeInputs('New  York'))
              .toBe('New York');
            expect(OpenFDAService.sanitizeInputs('eggs, and     bacon'))
              .toBe('eggs and bacon');
            //Safe characters: $-_.+!*'()
            expect(OpenFDAService.sanitizeInputs('$-_.+!*\'()'))
              .toBe('');
            //Reserved characters: $ & + , / : ; = ? @ 
            expect(OpenFDAService.sanitizeInputs('$&+,/:;=?@'))
              .toBe('');              
            //Unsafe characters: Includes the blank/empty space and " < > # % { } | \ ^ ~ [ ] `
            expect(OpenFDAService.sanitizeInputs(' "<>#%{}|\^~[]`'))
              .toBe(''); 
        });

        // // Putting `done` as argument allows async testing
        // it('Demonstrates asynchronous testing', function(done) {
        //     //var deferred = $q.defer();
        //     OpenFDAService.configure();

        //     OpenFDAService.getData();

        //     // $timeout(function() {
        //     //     deferred.resolve('I told you I would come!');
        //     // }, 1000); // This won't actually wait for 1 second.
        //     //           // `$timeout.flush()` will force it to execute.

        //     // deferred.promise

        //     OpenFDAService.getData().then(function(value) {
        //         console.log('value:' , value);
        //         // Tests set within `then` function of promise
        //         expect(value.results.leght>0).toBeTruthy();
        //     })
        //     // IMPORTANT: `done` must be called after promise is resolved
        //     .finally(done);

        //     $timeout.flush(); // Force digest cycle to resolve promises
        // });
    });
});