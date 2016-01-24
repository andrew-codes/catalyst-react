import sinon from 'sinon';
import agent from 'supertest-koa-agent';
import Koa from 'koa';
import sut from './htmlWrapper';

describe('server/middleware/htmlWrapper', function() {
  describe('when a request for a JavaScript resource comes to the server', () => {
    beforeEach(() => {
      this.expected = 'some JavaScript';
      this.app = new Koa();
      this.app.use(async (ctx, next) => {
        ctx.body = 'some JavaScript';
        await next();
      });
      this.app.use(sut());
    });
    it('it should skip this middleware', done => {
      agent(this.app)
        .get('/something.js')
        .expect(this.expected)
        .end(done);
    });
  });
  describe('when a request for a JSON resource comes to the server', () => {
    beforeEach(() => {
      this.expected = 'some JSON';
      this.app = new Koa();
      this.app.use(async (ctx, next) => {
        ctx.body = 'some JSON';
        await next();
      });
      this.app.use(sut());
    });
    it('it should skip this middleware', done => {
      agent(this.app)
        .get('/something.json')
        .expect(this.expected)
        .end(done);
    });
  });
  describe('when no scripts are provided and a request for something other than a JavaScript or JSON resource comes to the server', () => {
    beforeEach(() => {
      this.expected = 'Hello Koa';
      this.url = 'base Url';

      const getScripts = sinon.stub().returns([]);
      const Html = sinon.stub();
      const ReactDOMServer = {
        renderToStaticMarkup: sinon.stub().withArgs(Html({
          title: 'Hello Koa',
          body: 'Hello Koa',
          scripts: [],
          url: this.url
        })).returns(this.expected)
      };

      this.app = new Koa();
      this.app.use(async (ctx, next) => {
        ctx.route = {
          title: 'Hello Koa',
          body: 'Hello Koa'
        };
        await next();
      });

      sut.__Rewire__('getScripts', getScripts);
      sut.__Rewire__('Html', Html);
      sut.__Rewire__('ReactDOMServer', ReactDOMServer);
      this.app.use(sut({url: this.url, scripts: null}));
    });
    it('it should render the HTML component with the route\'s title, body, and scripts', done => {
      agent(this.app)
        .get('/someUrl')
        .expect(this.expected)
        .end(done);
    });
  });
  describe('when scripts are provided and a request for something other than a JavaScript or JSON resource comes to the server', () => {
    beforeEach(() => {
      this.expected = 'Hello Koa';
      this.url = 'base Url';

      const Html = sinon.stub();
      const ReactDOMServer = {
        renderToStaticMarkup: sinon.stub().withArgs(Html({
          title: 'Hello Koa',
          body: 'Hello Koa',
          scripts: [],
          url: this.url
        })).returns(this.expected)
      };

      this.app = new Koa();
      this.app.use(async (ctx, next) => {
        ctx.route = {
          title: 'Hello Koa',
          body: 'Hello Koa'
        };
        await next();
      });

      sut.__Rewire__('Html', Html);
      sut.__Rewire__('ReactDOMServer', ReactDOMServer);
      this.app.use(sut({url: this.url, scripts: []}));
    });
    it('it should render the HTML component with the route\'s title, body, and provided scripts', done => {
      agent(this.app)
        .get('/someUrl')
        .expect(this.expected)
        .end(done);
    });
  });
});

