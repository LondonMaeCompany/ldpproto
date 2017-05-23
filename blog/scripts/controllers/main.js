'use strict';
(function () {

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];
    function MainController($scope) {
        var vm = this;

        vm.Posts = [
            {
                'id': 0,
                'entryDate': '15 jun 2016',
                'entryUser': 'April',
                'comments': 10,
                'entryTitle': 'Lorem ipsum dolor sit amet consectetur elit sed',
                'entryContent': "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex commodo consequat. Duis aute irure dolor reprehend erit in voluptate velit ese cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidat at non proident sunt in culpa offica deserunt mollit anim id est quia laborum.",
            },{
                'id': 1,
                'entryDate': '15 jun 2017',
                'entryUser': 'Cory',
                'comments': 20,
                'entryTitle': 'Lorem ipsum dolor sit amet consectetur elit sed',
                'entryContent': "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex commodo consequat. Duis aute irure dolor reprehend erit in voluptate velit ese cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidat at non proident sunt in culpa offica deserunt mollit anim id est quia laborum.",
            },{
                'id': 2,
                'entryDate': '15 jan 2016',
                'entryUser': 'Tyler',
                'comments': 25,
                'entryTitle': 'Lorem ipsum dolor sit amet consectetur elit sed',
                'entryContent': "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex commodo consequat. Duis aute irure dolor reprehend erit in voluptate velit ese cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidat at non proident sunt in culpa offica deserunt mollit anim id est quia laborum.",
            },
        ]




    }
})();