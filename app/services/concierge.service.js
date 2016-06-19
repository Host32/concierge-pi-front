(function () {

    'use strict';
    angular.module('app.services')
        .factory('concierge', ['conciergeSocket', 'gate', 'bell', 'config', 'speaker', function (conciergeSocket, gate, bell, config, speaker) {

            var socket = null;

            function bindListeners() {
                bell.listen(socket);
            }

            return {
                connect: function () {
                    if (!socket) {
                        socket = conciergeSocket.connect();
                        bindListeners();
                    }
                },
                openGate: function () {
                    gate.open(socket);
                },
                getStreamUrl: function () {
                    return config.getServerStreamingAddres();
                },
                activateSpeaker: function () {
                    speaker.play();
                },
                desactivateSpeaker: function () {
                    speaker.stop();
                }
            };
        }]);

}());
