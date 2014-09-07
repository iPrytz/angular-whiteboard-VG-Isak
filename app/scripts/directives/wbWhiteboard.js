'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:whiteboard
 * @description
 * # whiteboard
 */
angular.module('whiteboardApp')
	.directive('wbWhiteboard', function () {
		return {
			templateUrl: './scripts/directives/templates/whiteboard.html',
			restrict: 'E'
		};
	});