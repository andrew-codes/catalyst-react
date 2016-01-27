var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
require('sinon-as-promised');
chai.use(chaiAsPromised);
module.exports = chai.should();
