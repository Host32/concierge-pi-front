(function () {

    'use strict';
    angular.module('app.services')
        .factory('conciergeSocket', ['config', function (config) {

            var socket = null;
            return {
                connect: function () {
                    if (!socket) {
                        socket = io.connect(config.getServerSocketAddress());
                    }
                    return socket;
                }
            };
        }]);

}());
