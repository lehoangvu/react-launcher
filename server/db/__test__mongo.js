var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var mongo = require('./mongo');

describe('Mongo', () => {
  it('toObjectId() should return ObjectId if arg is number', () => {
    expect(mongo.toObjectId(1)).to.be.a('boolean');
  });
  it('toObjectId() should return ObjectId if arg is string', () => {
    expect(mongo.toObjectId('string')).to.be.a('boolean');
  });
  it('toObjectId() should return ObjectId if arg is object', () => {
    expect(mongo.toObjectId({title: 'string'})).to.be.a('boolean');
  });
});