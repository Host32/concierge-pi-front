(function () {

    'use strict';
    angular.module('app.services')
        .factory('gate', [function () {
            return {
                open: function (socket) {
                    socket.emit('command', {
                        path: "outPin",
                        data: {
                            commandName: "SetState",
                            newState: {
                                on: true
                            }
                        }
                    });
                }
            };
        }]);

}());
