'use strict';


var services = angular.module('app.services', []);

/*
 * Factory: appResponse  - Get data from JSON to fake API responses
 */
 
services.factory('appResponse', ['$http',function ($http) {
	function load(path){
		return $http.get('/app/data/'+path+'.json');
	}
	return {
		getData: function(name){
			return load(name);
		}
	};
}
]);