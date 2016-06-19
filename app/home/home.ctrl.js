(function () {
    'use strict';

    angular.module('app.home')
        .controller('HomeCtrl', ['$scope', '$window', '$sce', 'concierge', function HomeCtrl($scope, $window, $sce, concierge) {
            var originatorEv;

            $scope.mic = false;
            $scope.stream = false;

            concierge.connect();

            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            };

            $scope.openMenu = function ($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $scope.openGate = function () {
                concierge.openGate();
            };

            $scope.toggleMic = function () {
                $scope.mic = !$scope.mic;

                if ($scope.mic) {
                    concierge.activateSpeaker();
                } else {
                    concierge.desactivateSpeaker();
                }
            };

            $scope.toggleStream = function () {
                $scope.stream = !$scope.stream;

                if (!$scope.stream) {
                    var element = document.getElementById('video');
                    element.pause();
                    element.src = "";
                    element.remove();
                }
            };

            $scope.streamUrl = function () {
                return concierge.getStreamUrl();
            };

            $scope.calcVideoHeight = function () {
                if ($window.screen.height < $window.screen.width) {
                    return ($window.screen.height - 20) + "px";
                }
                return ($window.screen.height / 2 - 10) + "px";
            };
            $scope.calcVideoWidth = function () {
                return $window.screen.width + "px";
            };

            $scope.config = function () {
                concierge.showConfig();
            };
        }]);
}());
