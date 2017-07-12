buster.spec.expose();


describe('WebStorage', function() {
	'use strict';

	var expect = buster.expect;
	var sandbox;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});


	it('throws if an invalid store is requested', function () {
		expect(function () {
			new WebStorage('notvalid');
		}).toThrow();
	});


	it('sets the default store to "localStorage"', function () {
		var webStore = new WebStorage();
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


	it('only sets the store if storage is supported', function () {
		sandbox.stub(localStorage, 'setItem').throws();
		var webStore = new WebStorage();
		expect(webStore.store).toBeNull();
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

		it('catches exceptions', function() {
			sandbox.stub(webStore.store, 'setItem').throws();
			expect(function() {
				webStore.store.setItem('key', 'value');
			}).toThrow();
			expect(function() {
				webStore.set('key', 'value');
			}).not.toThrow();
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

		it('catches exceptions', function() {
			sandbox.stub(webStore.store, 'getItem').throws();
			expect(function() {
				webStore.store.getItem('key');
			}).toThrow();
			expect(function() {
				webStore.get('key');
			}).not.toThrow();
			expect(webStore.get('key')).toBeNull();
		});

		it('returns null if storage unavailable', function () {
			webStore.store = null;
			webStore.set('key', 'value');
			expect(webStore.get('key')).toBeNull();
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

		it('catches exceptions', function() {
			sandbox.stub(webStore.store, 'removeItem').throws();
			expect(function() {
				webStore.store.removeItem('key');
			}).toThrow();
			expect(function() {
				webStore.rm('key');
			}).not.toThrow();
		});

		it('doesn\'t try if storage unavailable', function () {
			var spy = sandbox.spy(localStorage, 'removeItem');
			webStore.store = null;
			webStore.rm('key');
			expect(spy).not.toHaveBeenCalled();
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

		it('catches exceptions', function() {
			sandbox.stub(webStore.store, 'clear').throws();
			expect(function() {
				webStore.store.clear();
			}).toThrow();
			expect(function() {
				webStore.flush();
			}).not.toThrow();
		});

		it('doesn\'t try if storage unavailable', function () {
			var spy = sandbox.spy(localStorage, 'clear');
			webStore.store = null;
			webStore.flush();
			expect(spy).not.toHaveBeenCalled();
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

		it('returns null if storage unavailable', function () {
			webStore.store = null;
			webStore.set('key_1','value_1');
			webStore.set('key_2','value_2');
			var obj = webStore.getAll();
			expect(obj).toBeNull();

		});
	});
});