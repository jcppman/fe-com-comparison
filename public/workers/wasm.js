(function () {
'use strict';

self.Mp3LameEncoderConfig = {
    wasmBinaryFile: '../lib/Mp3LameEncoder-wasm.wasm',
    onReady: function () {
        self.onmessage = function (e) {
            const encoder = new self.Mp3LameEncoder(44100, 320);
            const {
                data: buffers
            } = e;
            const arrays = buffers.map(b => new Float32Array(b));
            encoder.encode(arrays);
            self.postMessage(encoder.finish());
        };
    },
    ENVIRONMENT: 'WEB'
};
importScripts('../lib/Mp3LameEncoder-wasm.js');

}());
//# sourceMappingURL=wasm.js.map
