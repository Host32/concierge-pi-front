(function () {
    'use strict';

    angular.module('app.services').factory('config', ['$mdDialog', function ($mdDialog) {
        var serverIP = localStorage.getItem('serverIP') || '192.168.0.102',
            socketPort = localStorage.getItem('socketPort') || '1337',
            streamPort = localStorage.getItem('streamPort') || 9000,
            speakerPort = localStorage.getItem('speakerPort') || 5002;

        return {
            setServerIP: function (ip) {
                serverIP = ip;
                localStorage.setItem('serverIP', ip);
            },
            setSocketPort: function (port) {
                socketPort = port;
                localStorage.setItem('socketPort', port);
            },
            setStreamPort: function (port) {
                streamPort = port;
                localStorage.setItem('streamPort', port);
            },
            setSpeakerPort: function (port) {
                speakerPort = port;
                localStorage.setItem('speakerPort', port);
            },
            getServerSocketAddress: function () {
                return 'ws://' + serverIP + ':' + socketPort;
            },
            getServerStreamAddres: function () {
                return 'http://' + serverIP + ':' + streamPort;
            },
            getServerSpeakerAddres: function () {
                return 'ws://' + serverIP + ':' + speakerPort;
            },
            showDialog: function () {
                var self = this;

                $mdDialog.show({
                    templateUrl: 'app/home/config.dialog.tpl.html',
                    clickOutsideToClose: true,
                    controller: ['$scope', function ($scope) {
                        $scope.config = {
                            serverIP: serverIP,
                            socketPort: socketPort,
                            streamPort: streamPort,
                            speakerPort: speakerPort
                        };

                        $scope.save = function () {
                            $mdDialog.hide($scope.config);
                        };
                    }]
                }).then(function (config) {
                    self.setServerIP(config.serverIP);
                    self.setSocketPort(config.socketPort);
                    self.setStreamPort(config.streamPort);
                    self.setSpeakerPort(config.speakerPort);
                });
            }
        };
    }]);

}());
