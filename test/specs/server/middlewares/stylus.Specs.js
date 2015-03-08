'use strict';

import proxy from 'proxyquire';
import sinon from 'sinon';

describe('stylus middleware', function () {
    beforeEach(() => {
        this.sut = null;
    });
    describe('when requiring the middleware', () => {
        beforeEach(() => {
            this.sut = proxy('./../../../../src/server/middlewares/stylus', {});
        });
        it('it should return a frozen object', () => {
            (() => {
                this.sut.route = 'me';
            }).should.throw();
        });
    });

    describe('when getting its route', () => {
        beforeEach(() => {
            this.sut = proxy('./../../../../src/server/middlewares/stylus', {});
            this.actual = this.sut.route;
        });
        it('it should be a route matching any file with a stylus (.styl) extension', () => {
            this.actual.should.be.equal('/**/*.styl');
        });
    });
    describe('given a server\'s request and response for a stylus file', () => {
        beforeEach(() => {
            this.request = {
                url: 'path/to/stylus/file'
            };
            this.response = {};
            this.response.set = sinon.stub().returns(this.response);
            this.response.status = sinon.stub().returns(this.response);
            this.response.send = sinon.stub().returns(this.response);
        });
        describe('when handling the route', () => {
            beforeEach(() => {
                this.expectedCss = 'some css';
                this.stylusTranspiler = sinon.stub().withArgs(this.request.url).resolves(this.expectedCss);
                this.sut = proxy('./../../../../src/server/middlewares/stylus', {
                    './transpilers/stylusTranspiler': this.stylusTranspiler
                });
                this.sut.handler(this.request, this.response);
            });
            it('should set the content type to be CSS', () => {
                this.stylusTranspiler().then(()=> {
                    this.response.set.should.have.been.calledWith('content-type', 'text/css');
                    this.response.status.should.have.been.calledWith(200);
                    this.response.send.should.have.been.calledWith(this.expectedCss);
                });
            });
        });
    });
});
