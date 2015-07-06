expect  = require('chai').expect;
    
describe('server', function () {
  before(function () {
    
  });

  describe('simple test', function(){
    it('should respond true',function(done){
      expect(200).to.equal(200);
      done();
    });
  });

  after(function () {
    
  });
});