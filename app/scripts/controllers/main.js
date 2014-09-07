'use strict';
angular.module('whiteboardApp')
	.controller('MainCtrl', function($interval, $scope, CRUDFactory, $location, $route) {
		$scope.postits = [];
		$scope.selectedWb = CRUDFactory.getSelectedWb();

		$scope.goToWbs = function() {
			$interval.cancel(intervalUpdate);
			$location.path('/');

			console.log('nooooo');
			console.log($route.current.params.selectedWbName);
		};
		/*function checkExistingWhiteboads() {
				var existingWbs = CRUDFactory.greadWhiteboards();

				for (var i = 0; i < existingWbs.length; i++) {
					if (existingWbs[i].nameAsUrl === 
				};
			}*/

		function updatePostits(postitArray, current, iterator) {
			CRUDFactory.readPostIts(function(data) {
				postitArray = data;
			});
			current = postitArray[iterator];
		}

		CRUDFactory.readPostIts(function(data) {
			$scope.postits = data;
		});
		var intervalUpdate = $interval(function() {
			CRUDFactory.readPostIts(function(data) {
				var getPostits = data;
				if (getPostits.length > 0) {
					for (var i = 0; i < $scope.postits.length; i++) {
						var getPostit = getPostits[i],
							oldPostit = $scope.postits[i];

						if (getPostit !== undefined) {
							$scope.postits[i].text = getPostit.text;
							$scope.postits[i].timestamp = getPostit.timestamp;
						}

						updatePostits(getPostits, getPostit, i);

						if (getPostit !== undefined) {
							if ($scope.postits[i].status !== getPostit.status) {
								$scope.postits[i] = getPostit;
							}
						}
						updatePostits(getPostits, getPostit, i);
						if (getPostit !== undefined) {
							if (getPostit.position.x !== oldPostit.position.x || getPostit.position.y !== oldPostit.position.y) {
								$scope.postits[i] = getPostit;
							}
						}
					}
					updatePostits(getPostits, null, null);
					if (getPostits.length > $scope.postits.length) {
						for (i = 0; i < getPostits.length - $scope.postits.length; i++) {
							$scope.postits.push(getPostits[i]);
						}
					}
					updatePostits(getPostits, null, null);

				} else {
					$scope.postits.length = 0;
				}
			});
		}, 1000);
	});