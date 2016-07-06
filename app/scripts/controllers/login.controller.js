'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:AuthenticationControllerCtrl
 * @description
 * # AuthenticationControllerCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationFactory',
      function ($scope, $rootScope, $location, AuthenticationFactory) {
        AuthenticationFactory.ClearCredentials();

        $scope.login = function () {
          $scope.dataLoading = true;
          AuthenticationFactory.Login($scope.username, $scope.password, function (response) {
            if (response.success) {
              AuthenticationFactory.SetCredentials($scope.username, $scope.password);
              $location.path('/');
            } else {
              $scope.error = response.message;
              $scope.dataLoading = false;
            }
          });
        };
      }]);
