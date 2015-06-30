define(
  [ 'angular',
    'angular-mocks',
    'components/services/open-fda-service'
  ],
  function(angular){

    describe('OpenFDA Service Unit Tests', function() {

      var $q,
        $httpBackend,
        OpenFDAService,
        LocationService,
        params = {
          distribution_pattern: 'VA',
          recalling_firm: 'Foods',
          classification: 'Class II',
          product_type: 'Food'
        },
        limitParams = {
          limit: 5
        },
        pageParams = {
          limit: 1,
          page: 3
        },
        statusParams = ['Status0', 'Status1', 'Status2', 'Status3'];
      //These should probably be loaded from\
      //JSON files in a directory for "mocks"
      var fakeResponses = [
        {
          meta: {
            disclaimer: 'openFDA is a beta research project and not for '+
              'clinical use. While we make every effort to ensure that data' +
              ' is accurate, you should assume all results are unvalidated.',
            license: 'http://open.fda.gov/license',
            last_updated: '2015-05-31',
            results: {
              skip: 0,
              limit: 25,
              total: 1
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
            recall_initiation_date: '20120909',
            state: 'MI',
            event_id: '63159',
            product_type: 'Food',
            product_description: '#011 Zucchini Stir,Fry 0.75 pounds',
            country: 'US',
            city: 'Grand Rapids',
            recalling_firm: 'Spartan Central Kitchen',
            report_date: '20121024',
            voluntary_mandated: 'Voluntary: Firm Initiated',
            classification: 'Class II',
            code_info: 'All with sell by dates on \
              or before 15-Sep with UPC 0-11213-90380',
            openfda: { },
            initial_firm_notification: 'E-Mail'
          }]
        },
        {
          meta: {
            disclaimer: 'openFDA is a beta research project and not for '+
              'clinical use. While we make every effort to ensure that data' +
              ' is accurate, you should assume all results are unvalidated.',
            license: 'http://open.fda.gov/license',
            last_updated: '2015-05-31',
            results: {
              skip: 0,
              limit: 25,
              total: 1
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
            recall_initiation_date: '20121010',
            state: 'MI',
            event_id: '63159',
            product_type: 'Food',
            product_description: '#011 Zucchini Stir,Fry 0.75 pounds',
            country: 'US',
            city: 'Grand Rapids',
            recalling_firm: 'Spartan Central Kitchen',
            report_date: '20121024',
            voluntary_mandated: 'Voluntary: Firm Initiated',
            classification: 'Class II',
            code_info: 'All with sell by dates on \
              or before 15-Sep with UPC 0-11213-90380',
            openfda: { },
            initial_firm_notification: 'E-Mail'
          }]
        },
        {
          meta: {
            disclaimer: 'openFDA is a beta research project and not for '+
              'clinical use. While we make every effort to ensure that data' +
              ' is accurate, you should assume all results are unvalidated.',
            license: 'http://open.fda.gov/license',
            last_updated: '2015-05-31',
            results: {
              skip: 0,
              limit: 25,
              total: 1
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
            recall_initiation_date: '20121111',
            state: 'MI',
            event_id: '63159',
            product_type: 'Food',
            product_description: '#011 Zucchini Stir,Fry 0.75 pounds',
            country: 'US',
            city: 'Grand Rapids',
            recalling_firm: 'Spartan Central Kitchen',
            report_date: '20121024',
            voluntary_mandated: 'Voluntary: Firm Initiated',
            classification: 'Class II',
            code_info: 'All with sell by dates on \
              or before 15-Sep with UPC 0-11213-90380',
            openfda: { },
            initial_firm_notification: 'E-Mail'
          }]
        }
      ];

      var fakeCountResponse = {
        results: [
          {
            time: '20120909',
            count: 1
          },
          {
            time: '20121010',
            count: 1
          },
          {
            time: '20121111',
            count: 1
          }
        ]
      };

      var expectedFakeData = angular.copy(fakeResponses);

      angular.forEach(expectedFakeData, function(expectedFake) {
        var result = expectedFake.results[0];
        result.recall_initiation_date =
          convertFDADateString(result.recall_initiation_date);
        result.report_date =
          convertFDADateString(result.report_date);
        result.last_updated = expectedFakeData[0].meta.last_updated;
      });

      function convertFDADateString(dateString) {
        if(!dateString) {
          return null;
        }

        var year = dateString.substr(0, 4),
          month = dateString.substr(4, 2),
          date = dateString.substr(6, 2);

        return  month + '/' + date + '/' + year;
      }

      function longRegex(arrayOfStrings) {
        return new RegExp(arrayOfStrings.join(''));
      }

      beforeEach(function(){
        module('safeFoodApp');

        angular.mock.inject(function (_$q_, _$httpBackend_,
          _OpenFDAService_, _LocationService_){
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            OpenFDAService = _OpenFDAService_;
            LocationService = _LocationService_;

            $httpBackend.whenGET('./states_hash.json').
              respond({ AL: 'Alabama', VA: 'Virginia', CA: 'California' });

            $httpBackend.whenGET(/https:\/\/.*count.*/).
              respond(fakeCountResponse);

            $httpBackend.whenGET(/https:\/\/.*(20120909).*/).
              respond(fakeResponses[0]);

            $httpBackend.whenGET(/https:\/\/.*20120910.*/).
              respond(fakeResponses[1]);

            $httpBackend.whenGET(/https:\/\/.*20121111.*/).
              respond(fakeResponses[2]);

            //ensure state_hash is gotten before other requests
            $httpBackend.flush();

        });
      });

      afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should sanitizes bad queries', function() {
        var ioMap = {
          'That\'s it!': 'That s it',
          'eggs, and     bacon': 'eggs and bacon',
          null: null,
          '': '',
          ' ': '',
          'New  York': 'New York',
          //Safe characters: $-_.+!*'()
          '$-_.+!*\'()': '',
          //Reserved characters: $ & + , / : ; = ? @ 
          '$&+,/:;=?@': '',
          //Unsafe characters: Includes the blank/empty
          //space and " < > # % { } | \ ^ ~ [ ] `
          ' "<>#%{}|\^~[]`': '',
        };

        for(var i in ioMap) {
          if(ioMap.hasOwnProperty(i)) {
            $httpBackend.expectGET(new RegExp('.*search=testParam:"' +
              ioMap[i] + '".*'));
            OpenFDAService.getData({ testParam: i });
          }
        }

        $httpBackend.flush();
      });


      it('should get meta data', function() {
        $httpBackend.expectGET(/https:\/\/.*limit=1.*/).
          respond(fakeResponses[0]);

        OpenFDAService.getMeta().then(function(value) {
          // Tests set within `then` function of promise
          var expected = angular.copy(fakeResponses[0].meta);
          delete expected.results;
          expect(value).toEqual(expected);
        });

        $httpBackend.flush(); // Force digest cycle to resolve promises

      });

      // Putting `done` as argument allows async testing
      it('should get sorted data', function() {

        OpenFDAService.getData().then(function(response) {
          // Tests set within `then` function of promise
          angular.forEach(expectedFakeData, function(data, i) {
            expect(response.results[response.results.length - i - 1]).
              toEqual(data.results[0]);
          });
          
          expect(response.results.length).toEqual(3);
          expect(response.meta.results.total).toEqual(3);
        });

        $httpBackend.flush(); // Force digest cycle to resolve promises
      });

      // Putting `done` as argument allows async testing
      it('should make requests with correct filters', function() {  
        var multilineRegexp = [ '.*search\\=',
          'distribution\\_pattern\\:\\(VA\\+Virginia\\+nationwide\\)',
          '\\+AND\\+recalling\\_firm\\:\\"Foods\\"',
          '\\+AND\\+classification\\:\\"Class II\\"',
          '\\+AND\\+product\\_type\\:\\"Food\\".*' ];

        $httpBackend.expectGET(longRegex(multilineRegexp));

        OpenFDAService.getData(params);

        $httpBackend.flush(); // Force digest cycle to resolve promises
      });

      it('should get recent data near me', function() {
        spyOn(LocationService, 'getGeolocation').
          and.callFake(function() {
            return $q.when({ coords: 1 });
          });
        spyOn(LocationService, 'getStateFromCoords').
          and.callFake(function() {
            return $q.when({ short_name: 'CA' });
          });

        $httpBackend.expectGET(
          /.*distribution_pattern:\(CA\+California\+nationwide\).*/
        );

        OpenFDAService.searchNearMe();

        $httpBackend.flush();
      });

      it('should request with correct limit constraints', function(){
          $httpBackend.expectGET(/limit=5/);

          OpenFDAService.getData(limitParams);

          $httpBackend.flush();
      });

      it('should return correctly paged/skiped results', function(){
        $httpBackend.expectGET(/https:\/\/.*limit=1.*/).
          respond(fakeResponses[0]);

        OpenFDAService.getData(pageParams).
          then(function(response) {
            expect(response.results).
              toEqual(expectedFakeData[0].results);
            expect(response.results.length).toEqual(1);
            expect(response.meta.results.total).toEqual(3);
          });

        $httpBackend.flush();
      });

      it('should request correct status params', function(){
        var urlRegexp = [
          [ 'https:\\/\\/.*status:\\("Status0"\\).*' ],
          [ 'https:\\/\\/.*status:\\("Status0"\\+"Status2"\\).*' ],
          [ 'https:\\/\\/.*&search=product_type:"Food"',
            '&count=recall_initiation_date$' ]
        ];

        $httpBackend.expectGET(longRegex(urlRegexp[0]));
        $httpBackend.expectGET(longRegex(urlRegexp[1]));
        $httpBackend.expectGET(longRegex(urlRegexp[2]));

        OpenFDAService.getData({ status: [ statusParams[0] ]});
        OpenFDAService.getData({ status: [ statusParams[0], statusParams[2] ]});
        OpenFDAService.getData({
          recall_initiation_date: { name:'All Records', dateOffset:null }
        });

        $httpBackend.flush();
      });
    });
});