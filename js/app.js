"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

var taskUrl = ' https://api.parse.com/1/classes/tasks';

angular.module('RateApp', [])
	.config(function($httpProvider) {
		$httpProvider.default.headers.common['X-Parse-Application-Id'] = 'wSTIwnlIBAEYc8sj1BYfr1Pl3WfLoSiYXqDRph03';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '7u7h7u5mEtcuLTgcGa7POurLgtJ9IAftfoluXnZX';
	}).controller('TasksController', function($scope, $http) {





	});