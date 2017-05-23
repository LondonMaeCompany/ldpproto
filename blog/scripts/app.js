
'use strict';

angular
  .module('app', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .when('/post/:id', {
        templateUrl: 'views/posts.html',
        controller: 'PostsController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });