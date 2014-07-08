/**
 * webstorage - v0.1.0 
 * Copyright (c) 2014 Kiva Microfunds
 * 
 * Licensed under the MIT license.
 * http://github.com/kiva/webstorage/license.txt
 */
(function () {
	'use strict';
	
	
	/**
	 *
	 * @param {String} store
	 * @constructor
	 */
	function WebStorage(store){
		if (typeof store == 'undefined') {
			store = 'localStorage';
		}
	
		if (store != 'localStorage' && store != 'sessionStorage') {
			throw new Error('Unsupported store given in webStorage');
		}
	
		if (!window.localStorage || !window.sessionStorage) {
			throw new Error('Unsupported Browser');
		}
	
		if (store == 'localStorage') {
			this.store = window.localStorage;
		}
	
		if (store == 'sessionStorage') {
			this.store = window.sessionStorage;
		}
	}
	
	
	WebStorage.prototype = {
	
		/**
		 * Sets a value to storage
		 *
		 * @param {String} key
		 * @param {*} value
		 */
		set: function (key, value) {
			var str_value = JSON.stringify(value);
			str_value = btoa(str_value); 
			this.store.setItem(key,str_value);
		}
	
	
		/**
		 * Gets a value from storage
		 *
		 * @param {String}
		 * @returns {*}
		 */
		, get: function (key) {
			var raw_value = this.store.getItem(key);
			if(raw_value === null){
				return null;
			}
			var enc_value = atob(raw_value); 
			return JSON.parse(enc_value);
		}
	
	
		/**
		 * Removes a key from storage
		 *
		 * @param {String} key
		 */
		, rm: function (key) {
			this.store.removeItem(key);
		}
	
	
		/**
		 * Empties out the store
		 */
		, flush: function () {
			this.store.clear();
		}
	
	
		/**
		 * Returns all values
		 *
		 * @returns {*}
		 */
		, getAll: function () {
			var store_values = {};
			for(var key in this.store){
				store_values[key] = this.get(key);
			}
	
			return store_values;
		}
	};
}());