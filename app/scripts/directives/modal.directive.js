'use strict';

/**
 * @ngdoc directive
 * @name frontApp.directive:modal.directive
 * @description
 * # modal.directive
 */
angular.module('frontApp')
  .directive('modal', function () {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true,
      transclude: true,
      link: function (scope) {
        scope.hideModal = function () {
          scope.show = false;
        };
      },
      templateUrl: 'views/modal-window.view.html'

    };
  });
