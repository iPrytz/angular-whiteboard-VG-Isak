'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostitEdit
 * @description
 * # wbPostitEdit
 */
angular.module('whiteboardApp')
	.directive('wbPostitEdit', function () {
		return {
			templateUrl: './scripts/directives/templates/post-it-edit.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			controller: function postItCtrl($scope, CRUDFactory) {
				$scope.inputText = $scope.content.text;
				$scope.updatePostit = function () {
					if ($scope.content.text !== $scope.inputText) {
						var date = new Date();
						$scope.content.text = $scope.inputText;
						$scope.content.timestamp = date.getFullYear() + '-' + ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1) + '-' + ((date.getDate() < 10) ? '0' : '') + (date.getDate()) + ' - ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + (date.getMinutes());
						CRUDFactory.updatePostIt($scope.content);
					}
					$scope.closeEditForm();
				};

				$scope.closeEditFormEsc = function (e) {
					if (e.keyCode === 27) {
						$scope.closeEditForm();
					}
				};

				$scope.closeEditForm = function () {
					$scope.inputText = $scope.content.text;
					$scope.$parent.showEditForm = false;
					$scope.$parent.$parent.isBeingEdited = false;
				};
			}
		};
	});