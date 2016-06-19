(function () {
    'use strict';

    angular.module('app.services')
        .factory('speaker', ['config', '$log', function (config, $log) {
            var client = null,
                stream = null;

            function convertoFloat32ToInt16(buffer) {
                var l = buffer.length,
                    buf = new Int16Array(l);

                while (l--) {
                    buf[l] = buffer[l] * 0xFFFF; //convert to 16 bit
                }
                return buf.buffer;
            }

            if (!navigator.getUserMedia) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia;
            }

            if (navigator.getUserMedia) {
                navigator.getUserMedia({
                    audio: true
                }, function (e) {
                    var AudioContext = window.AudioContext || window.webkitAudioContext,
                        context = new AudioContext(),

                        // the sample rate is in context.sampleRate
                        audioInput = context.createMediaStreamSource(e),

                        bufferSize = 2048,
                        recorder = context.createScriptProcessor(bufferSize, 1, 1);

                    recorder.onaudioprocess = function (e) {
                        var left = e.inputBuffer.getChannelData(0);
                        if (stream) {
                            stream.write(convertoFloat32ToInt16(left));
                        }
                    };

                    audioInput.connect(recorder);
                    recorder.connect(context.destination);
                }, function (e) {
                    $log.error(e);
                });
            } else {
                $log.error('getUserMedia not supported in this browser.');
            }

            return {
                play: function () {
                    if (client !== null || stream !== null) {
                        return;
                    }

                    client = new BinaryClient(config.getServerSpeakerAddres());

                    client.on('open', function () {
                        stream = client.createStream();
                    });
                },
                stop: function () {
                    stream.end();
                    client.close();
                    stream = null;
                    client = null;
                }
            };
        }]);

}());
