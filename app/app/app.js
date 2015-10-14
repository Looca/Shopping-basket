'use strict';

/* 
 * Main App file 
 * used for configuration
 */

var app = angular.module('eShopApp', ['ngRoute', 'app.controllers','app.services']);

app.config(function ($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		controller:'ProductsCtrl',
		controllerAs: 'productsCtrl',
		templateUrl:'/app/views/product-list.html'
	})
	.when('/cart', {
		controller:'CartCtrl',
		controllerAs: 'cartCtrl',
		templateUrl:'/app/views/cart.html'
	})
	.otherwise({redirectTo: '/'
	});

	 // use the HTML5 History API
     $locationProvider.html5Mode(true);
});