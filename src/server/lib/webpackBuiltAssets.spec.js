import sinon from 'sinon';
import {getScripts, __RewireAPI__} from './webpackBuiltAssets';

describe('server/lib/webpackBuiltAssets/getScripts', function() {
  describe('when in production mode', () => {
    beforeEach(() => {
      this.expected = ['app.123.js', 'vendor.123.js'];

      const config = {
        __PROD__: true,
        paths: {
          dist: sinon.stub()
            .withArgs('stats.json')
            .returns('./dist/stats.json')
        }
      };
      const fs = {
        readFileSync: sinon.stub()
          .withArgs('./dist/stats.json', 'utf8')
          .returns(`{
            "assetsByChunkName": {
              "app": "app.123.js",
              "vendor": "vendor.123.js"
            }
          }`)
      };

      __RewireAPI__.__Rewire__('config', config);
      __RewireAPI__.__Rewire__('fs', fs);
      this.actual = getScripts();
    });
    it('it should return the scripts from the stats.json webpack created file', () => {
      this.actual.should.eql(this.expected);
    });
  });
  describe('when not in production mode', () => {
    beforeEach(() => {
      const config = {__PROD__: false};

      __RewireAPI__.__Rewire__('config', config);
      this.actual = getScripts();
    });
    it('it should return an empty array', () => {
      this.actual.should.eql([]);
    });
  });
});
