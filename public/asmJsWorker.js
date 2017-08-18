(function () {
'use strict';

self.Mp3LameEncoderConfig = {
    ENVIRONMENT: 'WEB'
};
importScripts('lib/Mp3LameEncoder.js');

onmessage = function onmessage(e) {
    var encoder = new Mp3LameEncoder(44100, 320);
    var buffers = e.data;

    var arrays = buffers.map(function (b) {
        return new Float32Array(b);
    });
    encoder.encode(arrays);
    postMessage(encoder.finish());
};

}());
//# sourceMappingURL=asmJsWorker.js.map
