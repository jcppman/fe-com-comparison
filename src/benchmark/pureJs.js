export default function encode(data) {
    const buffers = data;
    const encoder = new lamejs.Mp3Encoder(2, 44100, 320);
    const encoded = encoder.encodeBuffer.apply(encoder.encodeBuffer, buffers);
    return Promise.resolve(
        new Blob([
            encoded,
            encoder.flush(),
        ], { type: 'audio/mp3' }),
    );
}
