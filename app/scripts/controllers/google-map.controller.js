'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:GoogleMapCtrl
 * @description
 * # GoogleMapCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('GoogleMapController', ['$scope', function ($scope) {
      $scope.cities = [];

      var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(48.379433, 31.16558)
      };

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      $scope.markers = [];

      function getMarkerUniqueId(lat, lng) {
        return lat + '_' + lng;
      }

      function getSelectedIndex(id, array) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].id === id) {
            return i;
          }
        }
        return -1;
      }

      $scope.createMarker = function (info) {
        var markerId = getMarkerUniqueId(info.lat, info.long);

        $scope.marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(info.lat, info.long),
          title: info.place,
          animation: google.maps.Animation.DROP,
          id: 'marker_' + markerId
        });

        $scope.markers.push($scope.marker);
      };

      $scope.removeItem = function (item) {
        var index = $scope.cities.indexOf(item);
        $scope.cities.splice(index, 1);
        $scope.markers[index].setMap(null);
        $scope.markers.splice(index, 1);
      };

      $scope.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocompete'));
      $scope.autocomplete.bindTo('bounds', $scope.map);

      google.maps.event.addListener($scope.autocomplete, 'place_changed',
        function () {
          $scope.$apply(function () {
            var geometry = $scope.autocomplete.getPlace().geometry,
              place = $scope.autocomplete.getPlace().address_components[0].long_name,
              desc = $scope.autocomplete.getPlace().formatted_address,
              lat = $scope.autocomplete.getPlace().geometry.location.lat(),
              long = $scope.autocomplete.getPlace().geometry.location.lng(),
              markerId = getMarkerUniqueId(lat, long),
              newCity = {
                place: place,
                desc: desc,
                lat: lat,
                long: long,
                id: 'marker_' + markerId
              };

            $scope.cities.push(newCity);

            var ind = getSelectedIndex(newCity.id, $scope.cities);
            $scope.createMarker($scope.cities[ind]);
          });
        });
    }]
  );
