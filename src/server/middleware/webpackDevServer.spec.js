import sinon from 'sinon';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import webpackDevServer from './webpackDevServer';

describe('src/server/middleware/webpackDevServer', function() {
  beforeEach(() => {
    this.WebpackDevMiddleware = sinon.stub();

    webpackDevServer.__Rewire__('WebpackDevMiddleware', this.WebpackDevMiddleware);
    this.actual = webpackDevServer(this.compiler, this.publicPath);
  });
  it('it should return a function', () => {
    Object.prototype.toString.call(this.actual).should.equal('[object Function]');
  });
  describe.skip('when applying the returned function as koa middleware', () => {
    beforeEach(() => {
      this.compiler = sinon.stub();
      this.publicPath = 'a public path URL';
      this.client = sinon.stub();
      this.compilerQuiet = 'quiet';
      this.compilerStats = 'stats';
      this.webpackDevMiddleware = sinon.stub(WebpackDevMiddleware.prototype);

      webpackDevServer.__Rewire__('WebpackDevMiddleware', this.webpackDevMiddleware);
      webpackDevServer.__Rewire__('config', {
        paths: {client: this.client},
        compilerQuiet: this.compilerQuiet,
        compilerStats: this.compilerStats
      });
      this.actual = webpackDevServer(this.compiler, this.publicPath);
    });
    it('it should ', () => {
      throw new Error('Not Implemented Error');
    });
  });
});
