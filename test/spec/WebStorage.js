buster.spec.expose();


describe('WebStorage', function() {
	'use strict';

	var expect = buster.expect;

	describe('.get', function () {
		it('exists', function () {
			expect(WebStorage.prototype.get).toBeDefined();
		});
	});


	describe('.set', function () {
		it('exists', function () {
			expect(WebStorage.prototype.set).toBeDefined();
		});
	});
});