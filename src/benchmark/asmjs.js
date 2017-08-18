import LameLib from '../lib/Mp3LameEncoder';

const Mp3LameEncoder = LameLib({
    ENVIRONMENT: 'WEB',
});

export default function encode(data) {
    const encoder = new Mp3LameEncoder(44100, 320);
    encoder.encode(data);
    return Promise.resolve(encoder.finish());
}
