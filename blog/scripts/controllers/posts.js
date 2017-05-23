'use strict';
(function() {

    angular
        .module('app')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['$scope'];
    function PostsController($scope) {
        var vm = this;
        vm.Hello = "Hello";

    }
})();