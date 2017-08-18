import LameLib from '../lib/Mp3LameEncoder-wasm';

let Mp3LameEncoder;

const loaded = new Promise((resolve) => {
    Mp3LameEncoder = LameLib({
        wasmBinaryFile: 'lib/Mp3LameEncoder-wasm.wasm',
        onReady: () => {
            resolve();
        },
        ENVIRONMENT: 'WEB',
    });
});

export default function encode(data) {
    return loaded.then(() => {
        const encoder = new Mp3LameEncoder(44100, 320);
        const buffers = data;
        encoder.encode(buffers);
        return Promise.resolve(encoder.finish());
    });
}
