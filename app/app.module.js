(function () {
    'use strict';

    var dependencies = [
        'ngMaterial',
        'templates',
        'app.home'
    ];

    angular.module('app', dependencies)
        .config(['$urlRouterProvider', '$mdThemingProvider', function ($urlRouterProvider, $mdThemingProvider) {
            $urlRouterProvider.otherwise('/');

            $mdThemingProvider.theme('default')
                .primaryPalette('teal')
                .accentPalette('teal');

            $mdThemingProvider.theme('red')
                .primaryPalette('red')
                .accentPalette('red');

            $mdThemingProvider.theme('light-green')
                .primaryPalette('light-green')
                .accentPalette('light-green');
        }])
        .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }]);


}());
