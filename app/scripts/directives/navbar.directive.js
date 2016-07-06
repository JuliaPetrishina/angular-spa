'use strict';

/**
 * @ngdoc directive
 * @name frontApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('frontApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.view.html',
      restrict: 'E',
      controller: 'NavigationController'
    };
  });
