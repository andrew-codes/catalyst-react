import sinon from 'sinon';
import Koa from 'koa';
import Server from './index';

describe('server/index', function() {
  describe('given the site is running in production mode, when starting the server', () => {
    beforeEach(() => {
      this.url = 'some base url';
      this.__PROD__ = true;
      this.webpackDevServer = sinon.spy();
      this.webpackHmr = sinon.spy();
      this.htmlWrapper = sinon.stub()
        .withArgs({url: this.url, scripts: null})
        .returns('htmlWrapper');
      this.dist = sinon.stub()
        .returns('dist');
      this.serve = sinon.stub()
        .withArgs('dist')
        .returns('served');
      this.convert = sinon.stub()
        .withArgs('served')
        .returns('converted');
      this.use = sinon.stub(Koa.prototype, 'use');

      Server.__Rewire__('webpackDevServer', this.webpackDevServer);
      Server.__Rewire__('webpackHmr', this.webpackHmr);
      Server.__Rewire__('config', {__PROD__: this.__PROD__, paths: {dist: this.dist}});
      Server.__Rewire__('htmlWrapper', this.htmlWrapper);
      Server.__Rewire__('convert', this.convert);
      Server.__Rewire__('serve', this.serve);
      Server.__Rewire__('Koa', Koa);
      this.actual = Server({url: this.url});
    });
    afterEach(() => {
      this.use.restore();
    });
    it('it should not use the webpack dev middleware', () => {
      this.webpackDevServer.called.should.be.false;
    });
    it('it should not use the webpack hot-reloading middleware', () => {
      this.webpackHmr.called.should.be.false;
    });
    it('it should use the htmlWrapper with passed URL and no scripts', () => {
      this.use.calledWith('htmlWrapper').should.be.true;
    });
    it('it should serve static assets from the dist directory', () => {
      this.use.calledWith('converted').should.be.true;
    });
  });

  describe('given the site is running in development mode, when starting the server', () => {
    beforeEach(() => {
      this.url = 'some base url';
      this.publicPath = 'some public path url';
      this.__DEV__ = true;
      this.compiler = 'compiler';
      this.compile = sinon.stub()
        .returns(Promise.resolve({compiler: this.compiler, scripts: ['app.1.js'], publicPath: this.publicPath}));
      this.webpackDevServer = sinon.stub()
        .withArgs(this.compiler, this.publicPath)
        .returns('middleware');
      this.webpackHmr = sinon.stub()
        .withArgs(this.compiler)
        .returns('hmr');
      this.htmlWrapper = sinon.stub()
        .withArgs({url: this.url, scripts: ['app.1.js']})
        .returns('htmlWrapper');
      this.dist = sinon.stub()
        .returns('dist');
      this.serve = sinon.stub()
        .withArgs('dist')
        .returns('served');
      this.convert = sinon.stub()
        .withArgs('served')
        .returns('converted');

      this.use = sinon.stub(Koa.prototype, 'use');

      Server.__Rewire__('webpackDevServer', this.webpackDevServer);
      Server.__Rewire__('webpackHmr', this.webpackHmr);
      Server.__Rewire__('config', {__DEV__: this.__DEV__, paths: {dist: this.dist}});
      Server.__Rewire__('htmlWrapper', this.htmlWrapper);
      Server.__Rewire__('compile', this.compile);
      Server.__Rewire__('Koa', Koa);
      this.actual = Server({url: this.url});
    });
    afterEach(() => {
      this.use.restore();
    });
    it('it should use the webpack dev middleware', done => {
      this.actual
        .then(() => this.use.calledWith('middleware').should.be.true)
        .then(() => done());
    });
    it('it should use the webpack hot-reloading middleware', done => {
      this.actual
        .then(() => this.use.calledWith('hmr').should.be.true)
        .then(() => done());
    });
    it('it should use the htmlWrapper with passed URL and webpack built scripts', done => {
      this.actual
        .then(() => this.use.calledWith('htmlWrapper').should.be.true)
        .then(() => done());
    });
    it('it should serve static assets from dist', done => {
      this.actual
        .then(() => this.use.calledWith('converted').should.be.true)
        .then(() => done());
    });
  });
});
