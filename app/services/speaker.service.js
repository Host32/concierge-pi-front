(function () {
    'use strict';

    angular.module('app.services')
        .factory('speaker', ['config', function (config) {
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

            return {
                play: function () {
                    if (!client) {
                        client = new BinaryClient(config.getServerSpeakerAddres());
                    }

                    client.on('open', function () {
                        stream = client.createStream();

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
                                    stream.write(convertoFloat32ToInt16(left));
                                };

                                audioInput.connect(recorder);
                                recorder.connect(context.destination);
                            }, function (e) {
                                console.log(e);
                            });
                        } else {
                            alert('getUserMedia not supported in this browser.');
                        }

                        window.startRecording = function () {
                            recording = true;
                        };

                        window.stopRecording = function () {
                            recording = false;
                        };

                    });
                },
                stop: function () {
                    stream.end();
                    client.close();
                    client = null;
                }
            };
        }]);

}());
