'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostitCreate
 * @description
 * # wbPostitCreate
 */
angular.module('whiteboardApp')
	.directive('wbPostItCreate', function($document, CRUDFactory) {
		return {
			templateUrl: './scripts/directives/templates/postit-create.html',
			restrict: 'E',
			link: function(scope) {
				var ghost = $('#post-it-ghost'),
					createPostItDiv = $('#create-post-it-div'),
					whiteBoard = $('.whiteboard'),
					x,
					y;

				function init() {
					$document.bind('mousemove', moveGhost);
					$document.bind('keydown', cancelOnEsc);
					scope.ghostActive = false;
				}

				init();

				function cancelOnEsc(event) {
					if (event.keyCode === 27) {
						if (scope.ghostActive) {
							scope.cancelCreationOfPostIt();
						} else {
							createPostItDiv.hide();
						}
					}
				}

				scope.toggleForm = function() {
					if (createPostItDiv.is(':visible')) {
						createPostItDiv.hide();
					} else {
						createPostItDiv.show();
					}
				};

				scope.cancelCreationOfPostIt = function() {
					unbindEvents();
					scope.ghostActive = false;
					ghost.removeClass('outside-boundaries').addClass('inside-boundaries');
					ghost.children().show();
				};

				scope.createPostItGhost = function() {
					var date = new Date();
					console.log('ghost' + scope.ghostActive + x + y);
					scope.postItTemplate = {
						id: '',
						author: scope.username,
						text: scope.postItText,
						status: 'not started',
						position: {
							x: 0,
							y: 0
						},
						removed: false,
						timestamp: date.getFullYear() + '-' + ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1) + '-' + ((date.getDate() < 10) ? '0' : '') + (date.getDate()) + ' - ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + (date.getMinutes())
					};

					bindEvents();

					createPostItDiv.hide();
					scope.postItText = '';

					scope.ghostActive = true;
					console.log('ghost är ' + scope.ghostActive);

				};

				function bindEvents() {
					ghost.hover(function() {
						$document.bind('mouseup', createPostItAtGhostPosition);
					}, function() {
						$document.unbind('mouseup', createPostItAtGhostPosition);
					});
				}

				function clampWidth(value) {
					var maxWidthValue = whiteBoard.width() - ghost.width(),
						minWidthValue = whiteBoard.offset().left;

					if (value >= maxWidthValue) {
						return maxWidthValue;
					} else if (value <= minWidthValue) {
						return minWidthValue;
					} else {
						return value;
					}
				}

				function clampHeight(value) {
					var maxHeightValue = whiteBoard.height() + whiteBoard.offset().top - 50,
						minHeightValue = whiteBoard.offset().top;

					if (value > maxHeightValue) {
						return maxHeightValue;
					} else if (value < minHeightValue) {
						return minHeightValue;
					} else {
						return value;
					}
				}

				function isOutsideOfPlaceableArea(x, y) {
					var ghostMargin = parseInt(ghost.css('margin'));

					var maxWidthValue = whiteBoard.width() + whiteBoard.offset().left - ghostMargin - 1,
						minWidthValue = whiteBoard.offset().left + ghostMargin,
						maxHeightValue = whiteBoard.height() + whiteBoard.offset().top - 50 + ghost.height(),
						minHeightValue = whiteBoard.offset().top + ghostMargin;

					return x > maxWidthValue ||
						x < minWidthValue ||
						y > maxHeightValue ||
						y < minHeightValue;
				}

				function moveGhost(event) {
					if (isOutsideOfPlaceableArea(event.pageX, event.pageY)) {
						ghost.removeClass('inside-boundaries').addClass('outside-boundaries');
						ghost.children().hide();
					} else {
						ghost.removeClass('outside-boundaries').addClass('inside-boundaries');
						ghost.children().show();
					}
					updateGraphicalPositions(event.pageX - ghost.width(), event.pageY - ghost.height());
				}

				function updateGraphicalPositions(newX, newY) {
					x = clampWidth(newX);
					y = clampHeight(newY);
					ghost.css({
						top: y + 'px',
						left: x + 'px'
					});
				}

				function unbindEvents() {
					ghost.unbind('mouseenter mouseleave');
					$document.unbind('mouseup', createPostItAtGhostPosition);
				}

				function createPostItAtGhostPosition() {
					unbindEvents();

					scope.postItTemplate.position.x = x;
					scope.postItTemplate.position.y = y;

					CRUDFactory.createPostIt(scope.postItTemplate,
						function created(postItCreated) {
							scope.postItTemplate.id = postItCreated.id;
							scope.postits.push(scope.postItTemplate);

							console.log('After CREATE success: PostIt was created on the server with an id of ' + postItCreated.id);

							scope.ghostActive = false;
						},
						function error() {
							bindEvents();
						});
				}
			}
		};
	});