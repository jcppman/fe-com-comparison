const worker = new Worker('workers/pureJs.js');

export default function encode(data) {
    return new Promise((resolve, reject) => {
        const buffers = data.map(d => d.buffer);
        worker.postMessage(buffers, buffers);
        worker.onmessage = (msg) => {
            resolve(msg.data);
        };
    });
}
