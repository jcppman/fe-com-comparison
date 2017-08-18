const worker = new Worker('workers/wasm.js');

export default function encode(data) {
    return new Promise((resolve) => {
        const buffers = data.map(d => d.buffer);
        worker.postMessage(buffers, buffers);
        worker.onmessage = (msg) => {
            resolve(msg.data);
        };
    });
}
