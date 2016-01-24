import sinon from 'sinon';
import compile from './compile';

describe('server/lib/compile', function() {
  describe('when compiling from webpack', () => {
    beforeEach(() => {
      this.compiler = 'compiler';
      this.publicPath = 'public Path URL';
      this.scripts = ['app.1.js'];
      this.webpackConfig = {
        output: {
          publicPath: this.publicPath
        }
      };
      this.webpack = (config, cb) => {
        cb(null, {
          toJson: sinon.stub()
            .returns({
              assetsByChunkName: {
                app: 'app.1.js'
              }
            })
        });
        return this.compiler;
      };
      this.webpackSpy = sinon.spy(this.webpack);

      compile.__Rewire__('webpackConfig', this.webpackConfig);
      compile.__Rewire__('webpack', this.webpack);

      this.actual = compile();
    });
    it('it should return the webpack compiler, the public path URL, and an array of compiled script filenames', done => {
      this.actual
        .then(data => data.should.eql({compiler: this.compiler, publicPath: this.publicPath, scripts: this.scripts}))
        .then(() => done());
    });
  });
});
