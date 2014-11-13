"use strict";
/*
    to Do: Include thumbs up thumbs down
            include delete function
            better presentaitoin for comment section
*/

var taskUrl = 'https://api.parse.com/1/classes/comments';

document.getElementById("comment-form").addEventListener("submit", onSubmit);

function onSubmit(evt) {
    evt.returnValue = validateForm(this);

    if (evt.returnValue == false && evt.preventDefault) {
        evt.preventDefault();

    }

    return evt.returnValue;
} //onSubmit()


function validateForm(form) {
    var requiredFields = ['name', 'comment', 'title'];
    var formValid = true;

    for(var i = 0; i < requiredFields.length; i++) {
        formValid &= validateRequiredField(form.elements[requiredFields[i]]);
    }

    return formValid;
} //validateForm()


function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;
    if(valid) {
        field.className = "form-control";

    }

    else {
        field.className = "form-control invalid-field";
    }

    return valid;


}

angular.module('RateApp', ['ui.bootstrap'])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'wSTIwnlIBAEYc8sj1BYfr1Pl3WfLoSiYXqDRph03';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '7u7h7u5mEtcuLTgcGa7POurLgtJ9IAftfoluXnZX';
	}).controller('CommentsController', function($scope, $http) {


        $scope.refreshComments = function() {
            $scope.loading = true;
            $http.get(taskUrl).success(function(data) {
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

        $scope.newComments = {

            title: '',
            name: '',
            comment: '',
            ratings: null

        };


        $scope.addComments = function() {
            document.getElementById("rating-message").style.display = "none";
            if($scope.newComments.title == '' || $scope.newComments.name == '' || $scope.newComments.comment == '' ||
                $scope.newComments.ratings == null) {
                if($scope.newComments.ratings == null) {
                    document.getElementById("rating-message").style.display = "block";
                    document.getElementById("rating-message").innerHTML = "AT least One star Please :(";


                    document.getElementById("rating-message").style.color = "red";
                }
                return;
            }
            else {

                $http.post(taskUrl, $scope.newComments).success(function (responseData) {
                    $scope.newComments.objectId = responseData.objectId;


                    $scope.comments.push($scope.newComments);
                    $scope.isEmpty = false;
                    $scope.newComments = {

                        title: '',
                        name: '',
                        comment: '',
                        ratings: null

                    };



                }).error(function (err) {
                    $scope.errorMessage = err;

                });
            }

        };





	});


