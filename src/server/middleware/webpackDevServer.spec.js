import sinon from 'sinon';
import webpackDevServer from './webpackDevServer';

describe('server/middleware/webpackDevServer', function() {
  beforeEach(() => {
    this.actual = webpackDevServer({compiler: null, publicPath: null});
  });
  it('it should return a function', () => {
    Object.prototype.toString.call(this.actual).should.equal('[object Function]');
  });
  describe('when applying the returned function as koa middleware', () => {
    beforeEach(() => {
      this.ctx = {};
      this.next = null;
      this.compiler = 'compiler';
      this.publicPath = 'a public path URL';
      this.config = {
        paths: {client: sinon.stub()},
        compilerQuiet: 'quiet',
        compilerStats: 'stats'
      };
      this.devMiddleware = 'middleware';
      this.webpackDevMiddleware = sinon.stub()
        .withArgs(this.compiler, {
          publicPath: this.publicPath,
          contentBase: this.config.paths.client(),
          hot: true,
          quiet: this.config.compilerQuiet,
          noInfo: this.config.compilerQuiet,
          lazy: false,
          stats: this.config.compilerStats
        })
        .returns(this.devMiddleware);
      this.applyExpressMiddleware = sinon.spy();

      webpackDevServer.__Rewire__('WebpackDevMiddleware', this.webpackDevMiddleware);
      webpackDevServer.__Rewire__('applyExpressMiddleware', this.applyExpressMiddleware);
      webpackDevServer.__Rewire__('config', this.config);
      this.actual = webpackDevServer({compiler: this.compiler, publicPath: this.publicPath})(this.ctx, this.next);
    });
    it('it should apply the webpack dev middleware using the provided compiler', () => {
      this.applyExpressMiddleware.calledWith(this.devMiddleware).should.be.true;
    });
  });
  describe('when the applied dev middleware does not handle a request', () => {
    beforeEach(() => {
      this.ctx = {};
      this.nextOutput = 'next';
      this.next = sinon.stub.resolves(this.nextOutput);
      this.compiler = 'compiler';
      this.publicPath = 'a public path URL';
      this.config = {
        paths: {client: sinon.stub()},
        compilerQuiet: 'quiet',
        compilerStats: 'stats'
      };
      this.devMiddleware = 'middleware';
      this.webpackDevMiddleware = sinon.stub()
        .withArgs(this.compiler, {
          publicPath: this.publicPath,
          contentBase: this.config.paths.client(),
          hot: true,
          quiet: this.config.compilerQuiet,
          noInfo: this.config.compilerQuiet,
          lazy: false,
          stats: this.config.compilerStats
        })
        .returns(this.devMiddleware);
      this.applyExpressMiddleware = sinon.stub().resolves(true);

      webpackDevServer.__Rewire__('WebpackDevMiddleware', this.webpackDevMiddleware);
      webpackDevServer.__Rewire__('applyExpressMiddleware', this.applyExpressMiddleware);
      webpackDevServer.__Rewire__('config', this.config);
      this.actual = webpackDevServer({compiler: this.compiler, publicPath: this.publicPath})(this.ctx, this.next);
    });
    it('it should await the next middleware if the applied webpack dev middleware returns true', () => {
      this.actual.should.eventually.equal(this.next);
    });
  });


});
