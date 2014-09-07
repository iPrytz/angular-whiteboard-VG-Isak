'use strict';
angular.module('whiteboardApp')
	.directive('wbPostItStatusPanel', function() {
		return {
			templateUrl: './scripts/directives/templates/post-it-status-panel.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			controller: function postLink($scope, CRUDFactory) {
				$scope.postIts = $scope.$parent.$parent.postits;
				$scope.done = 'done';
				$scope.inProgress = 'in progress';
				$scope.notStarted = 'not started';
				$scope.onhold = 'on hold';
				$scope.showEditForm = false;

				$scope.showEdit = function() {
					$scope.showEditForm = !$scope.showEditForm;
					$scope.$parent.isBeingEdited = true;
				};

				$scope.changeStatus = function(newStatus) {
					$scope.content.status = newStatus;
					CRUDFactory.updatePostIt($scope.content);
				};

				$scope.deletePostIt = function(id) {
					CRUDFactory.deletePostIt(id);
					for (var i = 0; i < $scope.postIts.length; i++) {
						if ($scope.postIts[i].id === id) {
							$scope.postIts.splice(i, 1);
						}
					}
				};
			}
		};
	});