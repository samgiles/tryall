require('es6-promise').polyfill();
var tryall = require('../index');
var assert = require('assert');

describe("tryall", function() {
	it("should reject if all promises are rejected", function(done) {
		tryall([
			Promise.reject("fail"),
			Promise.reject("fail")
		]).then(function(result) {
			done(result);
		}).catch(function(error) {
			assert.equal(2, error.length);
			done();
		});
	});

	it("should resolve if any promise succeeds", function(done) {
		tryall([
			Promise.reject("fail"),
			Promise.resolve("success")
		]).then(function(result) {
			assert.equal(2, result.length);
			assert(result[0] === undefined);
			assert(result[1] === "success");
			done();
		}).catch(function(error) {
			done(error);
		});
	});

	it("should resolve if all the promises succeed", function(done) {
		tryall([
			Promise.resolve("success"),
			Promise.resolve("success")
		]).then(function(result) {
			assert.equal(2, result.length);
			assert(result[0] === "success");
			assert(result[1] === "success");
			done();
		}).catch(function(error) {
			done(error);
		});
	});
});
