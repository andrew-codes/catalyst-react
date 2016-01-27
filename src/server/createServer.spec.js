import sinon from 'sinon';
import Koa from 'koa';
import createServer from './createServer';

describe('server/index', function() {
  describe('when creating the server', () => {
    beforeEach(() => {
      this.url = 'some base url';
      this.dist = sinon.stub()
        .returns('dist');
      this.config = {
        paths: {
          dist: this.dist
        }
      };
      this.htmlWrapper = sinon.stub()
        .withArgs({url: this.url, scripts: null})
        .returns('htmlWrapper');
      this.responseTime = sinon.stub()
        .returns('responseTime');
      this.serve = sinon.stub()
        .withArgs('dist')
        .returns('served');
      this.convert = sinon.stub()
        .withArgs('served')
        .returns('converted');
      this.use = sinon.stub(Koa.prototype, 'use');

      createServer.__Rewire__('config', this.config);
      createServer.__Rewire__('htmlWrapper', this.htmlWrapper);
      createServer.__Rewire__('responseTime', this.responseTime);
      createServer.__Rewire__('convert', this.convert);
      createServer.__Rewire__('serve', this.serve);
      createServer.__Rewire__('Koa', Koa);
      this.actual = createServer({url: this.url});
    });
    afterEach(() => {
      this.use.restore();
    });
    it('it should return a Koa server instance', () => {
      this.actual.should.be.instanceOf(Koa);
    });
    it('it should apply the htmlWrapper middleware to the created server with passed in URL and scripts', () => {
      this.use.calledWithExactly('htmlWrapper').should.be.true;
    });
    it('it should apply the responseTime middleware to the created server', () => {
      this.use.calledWithExactly('responseTime').should.be.true;
    });
    it('it should serve static assets from the dist directory', () => {
      this.use.calledWithExactly('converted').should.be.true;
    });
  });
});
