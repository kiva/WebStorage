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
	get: function(){
	
	}


	,set: function(){

	}


	,rm: function(){
	
	}


	,flush: function(){

	}


	,getAll: function(){

	}
};



