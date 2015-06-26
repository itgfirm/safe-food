define(
  [ 'angular',
    'angular-mocks',
    'components/services/open-fda-service'
  ],
  function(angular){

    describe('OpenFDA Service Unit Tests', function() {

      var OpenFDAService, $q, $timeout, $httpBackend; 
      var baseUrl = 'http://safe-food.gov',
          limitParams = {
            limit : 25, 
            skip  : 30   
          };

      //These should probably be loaded from JSON files in a directory for "mocks"
      var fakeResponse = {
          meta: {
            disclaimer: 'openFDA is a beta research project and not for '+
              'clinical use. While we make every effort to ensure that data' +
              ' is accurate, you should assume all results are unvalidated.',
            license: 'http://open.fda.gov/license',
            last_updated: '2015-05-31',
            results: {
              skip: 0,
              limit: 25,
              total: 8016
            }
          },
          results: [
          {
            recall_number: 'F-0283-2013',
            reason_for_recall: 'During an FDA inspection, microbiological'+
              ' swabs were collected and the results found that 21 sub'+
              ' samples in zones 1, 2 & 3 are positive for Listeria'+
              ' Monocytogenes (L.M.), Listeria innocua (L.I.) or Listeria'+
              ' seeligeri (L.S.). The firm is voluntarily recalling all '+
              'products manufactured from August 20th to September 10th 2012 '+
              'due to the possible contamination. All products with sell by'+
              ' dates on or before 11-OCT. No illnesses have been reported.',
            status: 'Ongoing',
            distribution_pattern: 'MI and OH only.',
            product_quantity: '520',
            recall_initiation_date: '20120910',
            state: 'MI',
            event_id: '63159',
            product_type: 'Food',
            product_description: '#011 Zucchini Stir,Fry 0.75 pounds',
            country: 'US',
            city: 'Grand Rapids',
            recalling_firm: 'Spartan Central Kitchen',
            report_date: '20121024',
            //@epoch: 1424553174.836488,
            voluntary_mandated: 'Voluntary: Firm Initiated',
            classification: 'Class II',
            code_info: 'All with sell by dates on or before 15-Sep with UPC 0-11213-90380',
            //@id: '00028a950de0ef32fc01dc3963e6fdae7073912c0083faf0a1d1bcdf7a03c44c',
            openfda: { },
            initial_firm_notification: 'E-Mail'
          }]
      };

      var fakeResponseProcessed = angular.copy(fakeResponse);
      fakeResponseProcessed.results[0].recall_initiation_date = '09/10/2012';
      fakeResponseProcessed.results[0].report_date = '10/24/2012';

      beforeEach(function(){
          module('safeFoodApp');

          inject(function (_$q_, _$timeout_, _$httpBackend_, _OpenFDAService_){
            //console.log('_OpenFDAService_',_OpenFDAService_);
            OpenFDAService = _OpenFDAService_;
            $q = _$q_;
            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('./states_hash.json').
              respond({AL: 'Alabama'});
            
            $httpBackend.when('GET', /https:\/\/.*/).
              respond(fakeResponse);

            //$httpBackend.when('GET', /https:\/\/.*/).passThrough();
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


      // Putting `done` as argument allows async testing
      it('gets data from openFDA', function(done) {
        
        OpenFDAService.getData().then(function(value) {
          // Tests set within `then` function of promise
          expect(value).toEqual(fakeResponseProcessed);
        })
        // IMPORTANT: `done` must be called after promise is resolved
        .finally(done);

        $httpBackend.flush(); // Force digest cycle to resolve promises
      });

      // it('Should convert date to correct openFDA API format', function(){
      //   expect(OpenFDAService.dateToQueryString(new Date('Thu Jun 25 00:00:00 2015')))
      //     .toBe('20150625');
      //   expect(OpenFDAService.dateToQueryString(new Date('2014-03-27T12:00:00')))
      //     .toBe('20140327');
      // });

      it('Should create correct URL using records limit constraints', function(){
        expect(OpenFDAService.createURL(baseUrl, limitParams))
          .toBe('http://safe-food.gov?api_key='+OpenFDAService.apiKey+'&limit=25&skip=30');
      });

    });
});