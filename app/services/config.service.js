(function () {
    'use strict';

    angular.module('app.services').factory('config', [function () {
        var serverIP = '192.168.0.102',
            socketPort = '1337',
            streamingPort = 9001,
            speakerPort = 5002;

        return {
            getServerSocketAddress: function () {
                return 'ws://' + serverIP + ':' + socketPort;
            },
            getServerStreamingAddres: function () {
                return 'http://' + serverIP + ':' + streamingPort;
            },
            getServerSpeakerAddres: function () {
                return 'ws://' + serverIP + ':' + speakerPort;
            }
        };
    }]);

}());
