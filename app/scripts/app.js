'use strict';

/**
 * @ngdoc overview
 * @name frontApp
 * @description
 * # frontApp
 *
 * Main module of the application.
 */
angular
  .module('frontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/users.view.html',
        controller: 'UsersController'
      })
      .when('/users', {
        templateUrl: 'views/users.view.html',
        controller: 'UsersController'
      })
      .when('/modal', {
        templateUrl: 'views/modal-page.view.html',
        controller: 'ModalController'
      })
      .when('/google-map', {
        templateUrl: 'views/google-map.view.html',
        controller: 'GoogleMapController'
      })
      .when('/login', {
        templateUrl: 'views/login.view.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }])
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function () {
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });
    }]);
