'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:UsersControllerCtrl
 * @description
 * # UsersControllerCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('UsersController', ['$scope',
    function ($scope) {
      $scope.users = [
        {name: 'Julia', id: '01'},
        {name: 'Pavel', id: '02'},
        {name: 'Vasay', id: '03'},
        {name: 'Kolay', id: '04'}
      ];

      $scope.remove = function (item) {
        var index = $scope.users.indexOf(item);
        $scope.users.splice(index, 1);
      };

      $scope.edit = function (item) {
        var index = $scope.users.indexOf(item);
        var user = $scope.users[index];
        $scope.name = user.name;
        $scope.id = user.id;
      };

      $scope.add = function () {
        $scope.users.push({
          name: $scope.name,
          id: $scope.id
        });
        $scope.name = '';
        $scope.id = '';
      };

      $scope.save = function () {
        var index = getSelectedIndex($scope.id);
        $scope.users[index].name = $scope.name;
      };

      function getSelectedIndex(id) {
        for (var i = 0; i < $scope.users.length; i++) {
          if ($scope.users[i].id === id) {
            return i;
          }
        }
        return -1;
      }

    }
  ]);
