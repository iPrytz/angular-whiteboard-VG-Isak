'use strict';
angular.module('whiteboardApp')
	.directive('wbLogin', function () {
		return {
			templateUrl: './scripts/directives/templates/login.html',
			restrict: 'E',
			controller: function postItCtrl($scope, localStorageService) {
				$scope.username = localStorageService.get('username');
				$scope.loggedIn = (function () {
					if ($scope.username !== undefined && $scope.username !== '' && $scope.username !== null) {
						return true;
					} else {
						return false;
					}
				}());
				$scope.login = function () {
					localStorageService.add('username', $scope.username);
					$scope.loggedIn = true;
				};
				$scope.logout = function () {
					localStorageService.remove('username');
					$scope.loggedIn = false;
					$scope.cancelCreationOfPostIt();
				};
			}
		};
	});