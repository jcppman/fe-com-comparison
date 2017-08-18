self.Mp3LameEncoderConfig = {
    ENVIRONMENT: 'WEB',
};
importScripts('../lib/Mp3LameEncoder.js');

onmessage = function(e) {
    const encoder = new Mp3LameEncoder(44100, 320);
    const {
        data: buffers,
    } = e;
    const arrays = buffers.map(b => new Float32Array(b));
    encoder.encode(arrays)
    postMessage(encoder.finish());
}
