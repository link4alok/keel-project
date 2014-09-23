/*global mocha:true */
/*jshint unused:false */

// Set the baseUrl relative to the test runner
require.baseUrl = '../js';

// Null out deps so that it doesn't automatically start the application
require.deps = null;

mocha.setup('bdd');

// console.log('config define');
