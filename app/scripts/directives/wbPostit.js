'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:postIt
 * @description
 * # postIt
 */
angular.module('whiteboardApp')
	.directive('wbPostIt', function($document, CRUDFactory) {
		return {
			templateUrl: './scripts/directives/templates/post-it.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			link: function postItCtrl(scope, element) {
				var startX = element.offset().left,
					startY = element.offset().top,
					y = scope.content.position.y,
					x = scope.content.position.x,
					whiteBoard = $('.whiteboard');

				function clampWidth(value) {
					var maxValue = whiteBoard.width() - element.width(),
						minValue = whiteBoard.offset().left;
					if (value >= maxValue) {
						return maxValue;
					} else if (value <= minValue) {
						return minValue;
					} else {
						return value;
					}
				}

				function clampHeight(value) {
					var maxValue = whiteBoard.height() + whiteBoard.offset().top - 50,
						minValue = whiteBoard.offset().top;
					if (value > maxValue) {
						return maxValue;
					} else if (value < minValue) {
						return minValue;
					} else {
						return value;
					}
				}
				element.css({
					left: scope.content.position.x + 'px',
					top: scope.content.position.y + 'px'
				});

				(function bindElementMove() {
					element.bind('mousedown', function(event) {
						if (!scope.isBeingEdited && !scope.$parent.ghostActive) {
							startX = event.screenX - element.offset().left;
							startY = event.screenY - element.offset().top;
							$document.bind('mousemove', movePostit);
							$document.bind('mouseup', mouseup);
						}
					});
				}());

				function movePostit(event) {
					if (!scope.isBeingEdited) {
						y = clampHeight(event.screenY - startY);
						x = clampWidth(event.screenX - startX);
						element.css({
							top: y + 'px',
							left: x + 'px'
						});
					}
				}

				function mouseup() {
					$document.unbind('mousemove', movePostit);
					$document.unbind('mouseup', mouseup);
					element.css({
						top: y + 'px',
						left: x + 'px'
					});
					if (x !== scope.content.position.x || y !== scope.content.position.y) {
						scope.content.position.x = x;
						scope.content.position.y = y;
						CRUDFactory.updatePostIt(scope.content);
					}
				}

				scope.getStatusCss = function() {
					return scope.content.status.replace(' ', '-');
				};

				scope.isBeingEdited = false;
				element.hover(
					function() {
						$(this).find('wb-post-it-status-panel').css('opacity', '1');
					},
					function() {
						if (!scope.isBeingEdited) {
							$(this).find('wb-post-it-status-panel').css('opacity', '0');
							$(this).find('.postit-scroll-read').animate({
								scrollTop: 0
							}, 600);
						}
					}
				);

			}
		};
	});