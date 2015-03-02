'use strict';

var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
var sinonAsPromised = require('sinon-as-promised');
