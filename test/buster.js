var config = module.exports;

config['Dev tests'] = {
	environment: 'browser'
	, rootPath: '../'
	, src: ['src/**/*.js']
	, specs: ['test/spec/**/*.js']
	, extensions: [
		require('buster-istanbul')
	]
	, 'buster-istanbul': {
		outputDirectory: 'test/coverage'
		, format: 'lcov'
	}
};
