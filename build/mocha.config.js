var chai = require('chai');
var {httpAsserts} = require('supertest-chai');
chai.use(httpAsserts);
module.exports = chai.should();
