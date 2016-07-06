"use strict";angular.module("frontApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/users.view.html",controller:"UsersController"}).when("/users",{templateUrl:"views/users.view.html",controller:"UsersController"}).when("/modal",{templateUrl:"views/modal-page.view.html",controller:"ModalController"}).when("/google-map",{templateUrl:"views/google-map.view.html",controller:"GoogleMapController"}).when("/login",{templateUrl:"views/login.view.html",controller:"LoginController"}).otherwise({redirectTo:"/login"})}]).run(["$rootScope","$location","$cookieStore","$http",function(a,b,c,d){a.globals=c.get("globals")||{},a.globals.currentUser&&(d.defaults.headers.common.Authorization="Basic "+a.globals.currentUser.authdata),a.$on("$locationChangeStart",function(){"/login"===b.path()||a.globals.currentUser||b.path("/login")})}]),angular.module("frontApp").controller("NavigationController",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path()}}]),angular.module("frontApp").directive("navbar",function(){return{templateUrl:"views/navbar.view.html",restrict:"E",controller:"NavigationController"}}),angular.module("frontApp").factory("AuthenticationFactory",["Base64","$http","$cookieStore","$rootScope","$timeout",function(a,b,c,d,e){var f={};return f.Login=function(a,b,c){e(function(){var d={success:"test"===a&&"test"===b};d.success||(d.message="Username or password is incorrect"),c(d)},1e3)},f.SetCredentials=function(e,f){var g=a.encode(e+":"+f);d.globals={currentUser:{username:e,authdata:g}},b.defaults.headers.common.Authorization="Basic "+g,c.put("globals",d.globals)},f.ClearCredentials=function(){d.globals={},c.remove("globals"),b.defaults.headers.common.Authorization="Basic "},f}]).factory("Base64",function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return{encode:function(b){var c,d,e,f,g,h="",i="",j="",k=0;do c=b.charCodeAt(k++),d=b.charCodeAt(k++),i=b.charCodeAt(k++),e=c>>2,f=(3&c)<<4|d>>4,g=(15&d)<<2|i>>6,j=63&i,isNaN(d)?g=j=64:isNaN(i)&&(j=64),h=h+a.charAt(e)+a.charAt(f)+a.charAt(g)+a.charAt(j),c=d=i="",e=f=g=j="";while(k<b.length);return h}}}),angular.module("frontApp").controller("LoginController",["$scope","$rootScope","$location","AuthenticationFactory",function(a,b,c,d){d.ClearCredentials(),a.login=function(){a.dataLoading=!0,d.Login(a.username,a.password,function(b){b.success?(d.SetCredentials(a.username,a.password),c.path("/")):(a.error=b.message,a.dataLoading=!1)})}}]),angular.module("frontApp").controller("UsersController",["$scope",function(a){function b(b){for(var c=0;c<a.users.length;c++)if(a.users[c].id===b)return c;return-1}a.users=[{name:"Julia",id:"01"},{name:"Pavel",id:"02"},{name:"Vasay",id:"03"},{name:"Kolay",id:"04"}],a.remove=function(b){var c=a.users.indexOf(b);a.users.splice(c,1)},a.edit=function(b){var c=a.users.indexOf(b),d=a.users[c];a.name=d.name,a.id=d.id},a.add=function(){a.users.push({name:a.name,id:a.id}),a.name="",a.id=""},a.save=function(){var c=b(a.id);a.users[c].name=a.name}}]),angular.module("frontApp").controller("GoogleMapController",["$scope",function(a){function b(a,b){return a+"_"+b}function c(a,b){for(var c=0;c<b.length;c++)if(b[c].id===a)return c;return-1}a.cities=[];var d={zoom:6,center:new google.maps.LatLng(48.379433,31.16558)};a.map=new google.maps.Map(document.getElementById("map"),d),a.markers=[],a.createMarker=function(c){var d=b(c.lat,c["long"]);a.marker=new google.maps.Marker({map:a.map,position:new google.maps.LatLng(c.lat,c["long"]),title:c.place,animation:google.maps.Animation.DROP,id:"marker_"+d}),a.markers.push(a.marker)},a.removeItem=function(b){var c=a.cities.indexOf(b);a.cities.splice(c,1),a.markers[c].setMap(null),a.markers.splice(c,1)},a.autocomplete=new google.maps.places.Autocomplete(document.getElementById("autocompete")),a.autocomplete.bindTo("bounds",a.map),google.maps.event.addListener(a.autocomplete,"place_changed",function(){a.$apply(function(){var d=(a.autocomplete.getPlace().geometry,a.autocomplete.getPlace().address_components[0].long_name),e=a.autocomplete.getPlace().formatted_address,f=a.autocomplete.getPlace().geometry.location.lat(),g=a.autocomplete.getPlace().geometry.location.lng(),h=b(f,g),i={place:d,desc:e,lat:f,"long":g,id:"marker_"+h};a.cities.push(i);var j=c(i.id,a.cities);a.createMarker(a.cities[j])})})}]),angular.module("frontApp").controller("ModalController",["$scope",function(a){a.modalShown=!1,a.toggleModal=function(){a.modalShown=!a.modalShown}}]),angular.module("frontApp").directive("modal",function(){return{restrict:"E",scope:{show:"="},replace:!0,transclude:!0,link:function(a){a.hideModal=function(){a.show=!1}},templateUrl:"views/modal-window.view.html"}}),angular.module("frontApp").run(["$templateCache",function(a){a.put("views/google-map.view.html",'<div ng-controller="GoogleMapController" class="b-map_holder"> <h1>Choose Your Country and Go!</h1> <div class="b-flex"> <div class="b-list__holder"> <input class="b-autocomplete" id="autocompete"> <ul class="b-list" ng-repeat="city in cities"> <li class="b-list__item">{{city.place}} <i class="b-btn_close" ng-click="removeItem(city)"></i> </li> </ul> </div> <div class="b-map b-flex__item" id="map"></div> </div> </div>'),a.put("views/login.view.html",'<div class="b-container"> <h1>Welcome to the SPA!</h1> <div class="b-login"> <div class="b-tile b-tile_info"> <p class="b-tile__text"><span class="b-tile__key">Username:</span> test</p> <p class="b-tile__text"><span class="b-tile__key">Password:</span> test</p> </div> <div ng-show="error" class="b-tile b-tile_error">{{error}}</div> <form name="form" ng-submit="login()" role="form"> <div class="b-form__group"> <input class="b-form__control" placeholder="Username" type="text" name="username" id="username" ng-model="username" required> <span class="b-form__help" ng-show="form.username.$dirty && form.username.$error.required">Username is required</span> </div> <div class="b-form__group"> <input class="b-form__control" placeholder="Password" type="password" name="password" id="password" ng-model="password" required> <span class="b-form__help" ng-show="form.password.$dirty && form.password.$error.required">Password is required</span> </div> <div class="b-btn__group"> <button class="b-btn b-btn_primary" type="submit" ng-disabled="form.$invalid || dataLoading">Login</button> </div> </form> </div> </div>'),a.put("views/modal-page.view.html",'<div class="b-container"> <a class="b-btn b-btn_primary b-btn_big b-btn_modal" ng-click="toggleModal()">Don\'t open this Modal Dialog</a> <modal show="modalShown"></modal> </div>'),a.put("views/modal-window.view.html",'<div class="b-modal" ng-show="show"> <div class="b-modal__overlay" ng-click="hideModal()"></div> <div class="b-modal__dialog"> <div class="b-btn_close" ng-click="hideModal()">&nbsp;</div> <div class="b-modal__content" ng-transclude> <div class="b-face"> <div class="b-face__mouth-holder"> <div class="b-face__mouth"></div> </div> </div> </div> </div> </div>'),a.put("views/navbar.view.html",'<header class="b-header"> <nav class="b-navbar"> <div class="b-container b-flex"> <div class="b-navbar__header"> <a class="b-navbar__brand" href="#/"> <img class="b-navbar__img" src="images/angular-logo.e9c0a5be.svg" alt="Angular SPA"> </a> </div> <ul class="b-navbar-nav b-flex__item"> <li class="b-navbar-nav__item" ng-class="{\'b-navbar-nav__item_active\':isActive(\'/users\')}"> <a class="b-navbar-nav__link" href="#/users">Users</a> </li> <li class="b-navbar-nav__item" ng-class="{\'b-navbar-nav__item_active\':isActive(\'/modal\')}"> <a class="b-navbar-nav__link" href="#/modal">Modal</a> </li> <li class="b-navbar-nav__item" ng-class="{\'b-navbar-nav__item_active\':isActive(\'/google-map\')}"> <a class="b-navbar-nav__link" ng-href="#/google-map">Google-Map</a> </li> </ul> </div> </nav> </header>'),a.put("views/users.view.html",'<div ng-controller="UsersController" class="b-container"> <h1>Welcome to Users Table!</h1> <div class="b-table-holder"> <table class="b-table"> <tr> <th class="b-table__header">Name</th> <th class="b-table__header b-table__cell_right">Action</th> </tr> <tr class="b-table__row" ng-repeat="user in users"> <td class="b-table__cell">{{user.name}}</td> <td class="b-table__cell b-table__cell_right"> <a class="b-btn b-btn_primary" ng-click="remove(user)">Remove</a> <a class="b-btn b-btn_primary" ng-click="edit(user)">Edit</a> </td> </tr> </table> </div> <form class="b-form b-form__inline b-flex"> <div class="b-form__group b-flex__item"> <input class="b-form__control" type="text" ng-model="name" class="form-control" id="userName" placeholder="User Name"> </div> <div class="b-btn__group b-btn__group_inline b-flex__item"> <button class="b-btn b-btn_primary" ng-click="add()">Add</button> <button class="b-btn b-btn_primary" ng-click="save()">Save</button> </div> </form> </div>')}]);