(function () {
'use strict';

importScripts('../lib/lame.all.js');

onmessage = function (e) {
    const {
        data: buffers
    } = e;

    const encoder = new lamejs.Mp3Encoder(2, 44100, 320);

    const arrays = buffers.map(b => new Int16Array(b));
    const encoded = encoder.encodeBuffer.apply(encoder.encodeBuffer, arrays);
    const result = [encoded, encoder.flush()];
    postMessage(new Blob(result, { type: 'audio/mp3' }));
};

}());
//# sourceMappingURL=pureJs.js.map
