'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function($http, $routeParams, $route) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id

		var URL = 'http://localhost:14782/wb-div-whiteboard=';
		var whiteboardsInDbURL = "http://localhost:14782/wb-div-whiteboards";
		var selectedWbUrl = 'main';
		var selectedWbName = 'main';

		return {
			//C
			createPostIt: function(newPostIt, successCallback, errorCallback) {
				//selectedWbUrl = $routeparams.selectedWbName;
				$http.post(URL + $route.current.params.selectedWbName, newPostIt).success(function(data) {
					successCallback(data);
					console.log(URL + '    ---    ' + selectedWbUrl);
				}).error(function() {
					errorCallback();
				});
			},
			//R
			readPostIts: function(callback) {
				$http.get(URL + $routeParams.selectedWbName + '/').success(function(data) {
					callback(data);
				});
			},
			//U
			updatePostIt: function(postIt) {
				$http.put(URL + $routeParams.selectedWbName + '/' + postIt.id, postIt);
				console.log(postIt + ' was updated on the server');
			},
			//D
			deletePostIt: function(postIt) {
				$http.delete(URL + $routeParams.selectedWbName + '/' + postIt);
				console.log(postIt + ' was deleted from the server');
			},
			createWhiteboard: function(newWb, successCallback, errorCallback) {
				$http.post(whiteboardsInDbURL, newWb).success(function(data) {
					successCallback(data);
				}).error(function() {
					errorCallback();
				});
			},
			readWhiteboards: function(callback) {
				$http.get(whiteboardsInDbURL + '/').success(function(data) {
					callback(data);
				});
			},
			selectWb: function(selectedWhiteboardURL, selectedWhiteboardName) {
				selectedWbUrl = selectedWhiteboardURL;
				selectedWbName = selectedWhiteboardName;
				console.log(selectedWbUrl + selectedWbName);
			},
			getSelectedWb: function() {
				return selectedWbName;
			}
		};
	});