'use strict';

import sinon from 'sinon';
import proxy from 'proxyquire';
let sutPath = './../../../../../src/server/middlewares/transpilers/stylusTranspiler';

describe('stylusTranspiler', function () {
    beforeEach(()=> {
        this.sut = null;
        this.url = {
            parse: sinon.stub()
        };
        this.decodedUrlPath = 'decoded url path name';
        this.filePath = 'file path for stylus file';
        this.pathName = 'path name from url';
        global.decodedURI = sinon.stub().withArgs(this.pathName).returns(this.decodedUrlPath);
        this.path = {
            normalizePath: sinon.stub().withArgs(this.decodedUrlPath).returns(this.filePath)
        };
        this.fileContents = 'file contents';
        this.fs = {
            readFile: (fileName, encoding, fn) => fn(null, 'file contents')
        };
        this.stylus = sinon.stub();
    });
    describe('given a URL to a stylus file that does not exist', () => {
        beforeEach(() => {
            this.urlPath = '/path/to/stylus.styl';
            this.url.parse.withArgs(this.urlPath).returns({
                pathname: () => this.pathName
            });
            this.fs = {
                readFile: (fileName, encoding, fn) => fn('error', null)
            };
        });
        describe('when transpiling the stylus to CSS', () => {
            beforeEach(() => {
                this.expected = 'some css';
                this.sut = proxy(sutPath, {
                    stylus: this.stylus,
                    url: this.url,
                    path: this.path,
                    fs: this.fs
                });
                this.actual = this.sut(this.urlPath);
            });
            it('should return the stylus transpiled to CSS', () => {
                this.actual.should.be.rejectedWith('error');
            });
        });
    });
    describe('given a URL to a stylus file', () => {
        beforeEach(() => {
            this.urlPath = '/path/to/stylus.styl';
            this.url.parse.withArgs(this.urlPath).returns({
                pathname: () => this.pathName
            });
        });
        describe('given the stylus file is valid stylus code', () => {
            beforeEach(() => {
                this.stylus.withArgs(this.fileContents).returns({
                    render: (fn)=> {
                        fn(null, this.expected);
                    }
                });
            });
            describe('when transpiling the stylus to CSS', () => {
                beforeEach(() => {
                    this.expected = 'some css';
                    this.sut = proxy(sutPath, {
                        stylus: this.stylus,
                        url: this.url,
                        path: this.path,
                        fs: this.fs
                    });
                    this.actual = this.sut(this.urlPath);
                });
                it('should return the stylus transpiled to CSS', () => {
                    this.actual.should.be.fulfilled;
                    this.actual.should.eventually.be.equal(this.expected);
                });
            });
        });

        describe('given the stylus file not valid stylus code', () => {
            beforeEach(() => {
                this.stylus.withArgs(this.fileContents).returns({
                    render: (fn)=> {
                        fn('error', null);
                    }
                });
            });
            describe('when transpiling the stylus to CSS', () => {
                beforeEach(() => {
                    this.expected = 'some css';
                    this.sut = proxy(sutPath, {
                        stylus: this.stylus,
                        url: this.url,
                        path: this.path,
                        fs: this.fs
                    });
                    this.actual = this.sut(this.urlPath);
                });
                it('should return the stylus transpiled to CSS', () => {
                    this.actual.should.be.rejectedWith('error');
                });
            });
        });
    });
});