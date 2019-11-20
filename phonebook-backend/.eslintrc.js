module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es6': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018
	},
	'rules': {
        'eqeqeq': 'error',		
        'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
        'noconsole': 0,
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ]
	}
}
