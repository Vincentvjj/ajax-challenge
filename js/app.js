"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

var taskUrl = ' https://api.parse.com/1/classes/tasks';

angular.module('RateApp', ['ui.bootstrap'])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'wSTIwnlIBAEYc8sj1BYfr1Pl3WfLoSiYXqDRph03';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '7u7h7u5mEtcuLTgcGa7POurLgtJ9IAftfoluXnZX';
	}).controller('CommentsController', function($scope, $http) {


//        $scope.isEmpty = true;

        $scope.refreshComments = function() {
            $scope.loading = true;
            $http.get(taskUrl).success(function (data) {
                $scope.comments = data.results;

                if(data.results.length == 0) {
                    $scope.isEmpty = true;


                }
                else {
                    $scope.isEmpty = false;

                }


            }).error(function(err) {
                $scope.errorMessage = err;
            }).finally(function() {
                $scope.loading = false;
            });
        };

        $scope.refreshComments();
        $scope.newComments = '';

        $scope.addComments = function() {
            $http.post(taskUrl, $scope.newComments).success(function(responseData) {
                $scope.newComments.objectId = responseData.objectId;
                $scope.comments.push($scope.newComments);
                $scope.isEmpty = false;
            }).error(function(err) {
                $scope.errorMessage = err;

            });


        };

//        $scope.updateTask = function(comment) {
//
//            $http.put(taskUrl + '/' + comment.objectId, comment).success(function() {
//
//            }).error(function(err) {
//                $scope.errorMessage = err;
//            });
//        };






	});


