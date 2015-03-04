'use strict';

require('babel/register');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
var sinonAsPromised = require('sinon-as-promised');
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
global.navigator = global.window.navigator;
