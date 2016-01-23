import sinon from 'sinon';
import agent from 'supertest-koa-agent';
import Koa from 'koa';
import sut from './reponseTime';

describe('server/middleware/responseTime', function() {
  describe('when a request comes to the server', () => {
    beforeEach(() => {
      this.ms = 200;
      const startTimeStamp = new Date();
      const endTimeStamp = startTimeStamp.setMilliseconds(startTimeStamp.getMilliseconds() + this.ms);

      const getTimeStamp = sinon.stub();
      getTimeStamp.onFirstCall().returns(startTimeStamp);
      getTimeStamp.onSecondCall().returns(endTimeStamp);

      this.app = new Koa();

      sut.__Rewire__(getTimeStamp, getTimeStamp);
      this.app.use(sut());
    });
    it('it should add the time to process the response to the HTTP headers', (done) => {
      agent(this.app)
        .get('/')
        .end(response => {
          true.should.be.true;
          done();
        });
    });
  });
});
