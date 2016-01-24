import sinon from 'sinon';
import agent from 'supertest-koa-agent';
import Koa from 'koa';
import sut from './responseTime';

describe('server/middleware/responseTime', function() {
  describe('when a request comes to the server', () => {
    beforeEach(() => {
      this.ms = 200;
      const startTimeStamp = new Date();
      const endTimeStamp = new Date(startTimeStamp);
      endTimeStamp.setMilliseconds(startTimeStamp.getMilliseconds() + this.ms);

      const getTimeStamp = sinon.stub();
      getTimeStamp.onFirstCall().returns(startTimeStamp);
      getTimeStamp.onSecondCall().returns(endTimeStamp);

      this.app = new Koa();
      this.app.use(async (ctx, next) => {
        await next();
        ctx.body = 'hello world';
      });

      sut.__Rewire__('getTimeStamp', getTimeStamp);
      this.app.use(sut());
    });
    it('it should add the time to process the response to the HTTP headers', done => {
      agent(this.app)
        .get('/')
        .expect('x-response-time', `${this.ms}ms`)
        .end(done);
    });
  });
});
