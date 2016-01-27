import sinon from 'sinon';
import htmlWrapper from './htmlWrapper';

describe('server/middleware/htmlWrapper', function() {
  beforeEach(() => {
    this.actual = htmlWrapper({url: null, scripts: null});
  });
  it('it should return a function', () => {
    Object.prototype.toString.call(this.actual).should.equal('[object Function]');
  });
  describe('when a request for a JavaScript resource comes to the server', () => {
    beforeEach(() => {
      this.ctx = {
        url: 'app.1.js'
      };
      this.actual = htmlWrapper({url: null, scripts: null})(this.ctx, null);
    });
    it('it should skip this middleware', () => {
      this.actual.should.eventually.equal(null);
    });
  });
  describe('when a request for a JSON resource comes to the server', () => {
    beforeEach(() => {
      this.input = {url: null, scripts: null};
      this.ctx = {
        url: 'app.1.json'
      };
      this.actual = htmlWrapper(this.input)(this.ctx, null);
    });
    it('it should skip this middleware', () => {
      this.actual.should.eventually.equal(null);
    });
  });
  describe('when a request a matching route', () => {
    beforeEach(() => {
      throw new Error('Not Implemented Error');
    });
  });
});

