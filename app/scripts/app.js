'use strict';

/**
 * @ngdoc overview
 * @name whiteboardApp
 * @description
 * # whiteboardApp
 *
 * Main module of the application.
 */
angular
	.module('whiteboardApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'LocalStorageModule'
	]).config(['localStorageServiceProvider',
		function(localStorageServiceProvider) {
			localStorageServiceProvider.setPrefix('wb-div');
		}
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/whiteboard/:selectedWbName', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl'
			})
			.when('/', {
				templateUrl: 'views/start.html',
				controller: 'StartCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});