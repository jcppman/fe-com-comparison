(function () {
'use strict';

importScripts('lib/lame.all.js');

var encoder = new lamejs.Mp3Encoder(2, 44100, 320);

onmessage = function onmessage(e) {
    var buffers = e.data;

    var arrays = buffers.map(function (b) {
        return new Int16Array(b);
    });
    var encoded = encoder.encodeBuffer.apply(encoder.encodeBuffer, arrays);
    postMessage(new Blob([encoded, encoder.flush()], { type: 'audio/mp3' }));
};

}());
//# sourceMappingURL=pureJsWorker.js.map
