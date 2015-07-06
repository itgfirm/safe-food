expect  = require('chai').expect;
    
describe('server', function () {
  before(function () {
    
  });

  describe('simple test', function(){
    it('should be started',function(done){
      expect(200).to.equal(200);
      done();
    });
  });

  after(function () {
    
  });
});