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


	describe('.set()', function () {
		var webStore;


		beforeEach(function () {
			webStore = new WebStorage('localStorage');
		});


		it('sets obfuscated data in the store', function () {
			webStore.set('test', 'jellybeans');
			expect(localStorage.getItem('test')).toBe('ImplbGx5YmVhbnMi');
			// make sure we get back the exact data types.
			webStore.set('key_1','this is a string');
			expect(webStore.get('key_1')).toBeString();
			webStore.set('key_2',491);
			expect(webStore.get('key_2')).toBeNumber();
			webStore.set('key_3',false);
			expect(webStore.get('key_3')).toBeBoolean();
			webStore.set('key_4',{some_key:'some_value'});
			expect(webStore.get('key_4')).toBeObject();
		});
	});


	describe('.get()', function () {
		var webStore;


		beforeEach(function () {
			webStore = new WebStorage('localStorage');
		});


		it('gets data from the store and de-obfuscates it', function () {
			localStorage.setItem('test', 'ImplbGx5YmVhbnMi');
			expect(webStore.get('test')).toBe('jellybeans');
		});
	});

	
	describe('.rm()', function () {
		var webStore;


		beforeEach(function () {
			webStore = new WebStorage('localStorage');
		});


		it('removes value from store', function () {
			webStore.set('key_1','value_1');
			webStore.rm('key_1');
			expect(webStore.get('key_1')).toBeNull();

		});
	});	


	describe('.flush()', function () {
		var webStore;


		beforeEach(function () {
			webStore = new WebStorage('localStorage');
		});


		it('removes all values from the store', function () {
			webStore.set('key_1','value_1');
			webStore.set('key_2','value_2');
			webStore.flush();
			expect(webStore.get('key_1')).toBeNull();
			expect(webStore.get('key_1')).toBeNull();
			expect(localStorage.length).toBe(0);

		});
	});


	describe('.getAll()', function () {
		var webStore;


		beforeEach(function () {
			webStore = new WebStorage('localStorage');
		});


		it('gets all values as an object', function () {
			webStore.set('key_1','value_1');
			webStore.set('key_2','value_2');
			var obj = webStore.getAll();
			expect(obj.key_1).toBe('value_1');
			expect(obj.key_2).toBe('value_2');

		});
	});		
});