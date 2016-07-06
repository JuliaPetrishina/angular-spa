'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:ModalController
 * @description
 * # ModalController
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('ModalController', function ($scope) {
    $scope.modalShown = false;
    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
    };
  });
