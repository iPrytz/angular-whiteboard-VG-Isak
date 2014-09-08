'use strict';
angular.module('whiteboardApp')
	.controller('StartCtrl', function($scope, CRUDFactory, $location) {

		$scope.whiteboards = [];
		$scope.selectedWb = 'main';

		CRUDFactory.readWhiteboards(function(data) {
			$scope.whiteboards = data;
		});

		$scope.newWhiteboard = function() {
			if ($scope.newWhiteboardInput !== '' && $scope.newWhiteboardInput !== undefined) {
				var getNameAsURL = function() {
					var nameAsURL = $scope.newWhiteboardInput;
					nameAsURL = nameAsURL.toLowerCase();
					nameAsURL = nameAsURL.replace(/ /g, '-');
					return nameAsURL;
				};
				var wbExists = false;
				for (var i = 0; i < $scope.whiteboards.length; i++) {
					if ($scope.whiteboards[i].name === $scope.newWhiteboardInput) {
						wbExists = true;
						break;
					}
				}

				if (!wbExists) {
					var newWhiteboardObj = {
						id: '',
						name: $scope.newWhiteboardInput,
						nameAsURL: getNameAsURL()
					};

					CRUDFactory.createWhiteboard(newWhiteboardObj,
						function created(wbCreated) {
							newWhiteboardObj.id = wbCreated.id;
							$scope.whiteboards.push(newWhiteboardObj);
							console.log('After CREATE success: whiteboard was created on the server with an id of ' + wbCreated.id);
						},
						function error() {
							console.log('ERROR!');
						});
				}
			}

		};

		$scope.selectWb = function(selectedWhiteboard) {
			$location.path('/whiteboard/' + selectedWhiteboard.nameAsURL);

		};


	});