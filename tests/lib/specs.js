'use strict';

var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
var bluebird = require('bluebird');
var sinonAsPromised = require('sinon-as-promised')(bluebird);
