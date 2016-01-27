import sinon from 'sinon';
import responseTime from './responseTime';

describe('server/middleware/responseTime', function() {
  beforeEach(() => {
    this.actual = responseTime();
  });
  it('it should return a function', () => {
    Object.prototype.toString.call(this.actual).should.equal('[object Function]');
  });
  describe('when a request comes to the server', () => {
    beforeEach(() => {
      this.ms = 200;
      this.next = async () => setTimeout('', this.ms);
      this.ctx = {set: sinon.spy()};

      this.actual = responseTime()(this.ctx, this.next);
    });
    it('it should add the time to process the response to the HTTP headers', done => {
      this.ctx.set.calledWith('x-response-time', `${this.ms}ms`);
      this.actual.then(done);
    });
  });
});
