(function () {

    'use strict';
    angular.module('app.services')
        .factory('bell', ['$mdToast', function ($mdToast) {
            return {
                listen: function (socket) {

                    //42["sensorBroadcast",{"path":"button","data":{"responseType":"stateChanged","state":{"on":false}}}]
                    socket.on('sensorBroadcast', function (data) {
                        if (data.path === 'button') {
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent('A campanhia tocou!')
                                .position('top')
                                .hideDelay(5000)
                                .action('x')
                            );
                        }
                    });
                }
            };
        }]);

}());
