(function () {
'use strict';

self.Mp3LameEncoderConfig = {
    wasmBinaryFile: 'lib/Mp3LameEncoder-wasm.wasm',
    onReady: function onReady() {
        var encoder = new self.Mp3LameEncoder(44100, 320);
        self.onmessage = function (data) {
            encoder.encode(data.float32);
            self.postMessage(encoder.finish());
        };
    }
};
importScripts('lib/Mp3LameEncoder-wasm.js');

}());
//# sourceMappingURL=wasmWorker.js.map
