(function () {
    'use strict';

    var dependencies = [
        'ngMaterial',
        'templates',
        'app.home',
        'app.services'
    ];

    angular.module('app', dependencies)
        .config(['$urlRouterProvider', '$mdThemingProvider', function ($urlRouterProvider, $mdThemingProvider) {
            $urlRouterProvider.otherwise('/');

            $mdThemingProvider.theme('default')
                .primaryPalette('teal')
                .accentPalette('blue');

            $mdThemingProvider.theme('red')
                .primaryPalette('red')
                .accentPalette('red');

            $mdThemingProvider.theme('light-green')
                .primaryPalette('light-green')
                .accentPalette('blue');
        }])
        .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }]);


}());
