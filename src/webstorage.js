'use strict';

/**
 * Does the current browser support the given store?
 *
 * Based on the Modernizr localStorage test:
 * https://github.com/Modernizr/Modernizr/blob/cfc3a3fd5457d47d04e5cc50611ac7665c38bea8/feature-detects/storage/localstorage.js
 *
 * @param store
 * @returns {boolean}
 */
function storageSupported(store) {
	var t = 'test';
	try {
		window[store].setItem(t, t);
		window[store].removeItem(t);
		return true;
	} catch(e) {
		return false;
	}
}


/**
 *
 * @param {String} [store]
 * @constructor
 */
function WebStorage(store){
	if (typeof store === 'undefined') {
		store = 'localStorage';
	}

	if (store !== 'localStorage' && store !== 'sessionStorage') {
		throw new Error('Unsupported store given in webStorage');
	}

	this.store = storageSupported(store) ? window[store] : null;
}


WebStorage.prototype = {

	/**
	 * Sets a value to storage
	 *
	 * @param {String} key
	 * @param {*} value
	 */
	set: function (key, value) {
		if (this.store) {
            try {
                var str_value = JSON.stringify(value);
                str_value = btoa(str_value);
                this.store.setItem(key, str_value);
			} catch(e) {}
		}
	}


	/**
	 * Gets a value from storage
	 *
	 * @param {String}
	 * @returns {*}
	 */
	, get: function (key) {
		if (this.store) {
			try {
				var raw_value = this.store.getItem(key);
				if (raw_value === null) {
					return null;
				}
				var enc_value = atob(raw_value);
				return JSON.parse(enc_value);
			} catch (e) {}
		}
		return null;
	}


	/**
	 * Removes a key from storage
	 *
	 * @param {String} key
	 */
	, rm: function (key) {
		if (this.store) {
			try {
				this.store.removeItem(key);
			} catch(e) {}
		}
	}


	/**
	 * Empties out the store
	 */
	, flush: function () {
		if (this.store) {
			try {
				this.store.clear();
			} catch(e) {}
		}
	}


	/**
	 * Returns all values
	 *
	 * @returns {*}
	 */
	, getAll: function () {
		if (this.store) {
			var store_values = {};
			for(var key in this.store){
				store_values[key] = this.get(key);
			}

			return store_values;
		}
		return null;
	}
};



