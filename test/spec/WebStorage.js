buster.spec.expose();


describe('WebStorage', function() {
	'use strict';

	var expect = buster.expect;


	it('throws if an invalid store is requested', function () {
		expect(function () {
			new WebStorage('notvalid');
		}).toThrow();
	});


	it('sets the default store to "localStorage"', function () {
		var webStore = new WebStorage('localStorage');
		expect(webStore.store).toBe(localStorage);
	});


	it('creates a wrapper around localStorage if passed the argument, "localStorage"', function () {
		var webStore = new WebStorage('localStorage');
		expect(webStore.store).toBe(localStorage);
	});


	it('creates a wrapper around sessionStorage if passed the argument, "sessionStorage"', function () {
		var webStore = new WebStorage('sessionStorage');
		expect(webStore.store).toBe(sessionStorage);
	});


	describe('.set', function () {
		var webStore;


		beforeEach(function () {
			webStore = new WebStorage('localStorage');
		});


		it('sets obfuscated data in the store', function () {
			webStore.set('test', 'jellybeans');
			expect(localStorage.getItem('test')).toBe('amVsbHliZWFucw==');
		});
	});


	describe('.get', function () {
		var webStore;


		beforeEach(function () {
			webStore = new WebStorage('localStorage');
		});


		it('gets data from the store and de-obfuscates it', function () {
			localStorage.setItem('test', 'amVsbHliZWFucw==');
			expect(webStore.get('test')).toBe('jellybeans');
		});
	});
});