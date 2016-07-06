'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the frontApp
 */

angular.module('frontApp')
  .controller('NavigationController', function NavigationController($scope, $location) {
    $scope.isActive = function(path){
      return path === $location.path();
    };
  });

