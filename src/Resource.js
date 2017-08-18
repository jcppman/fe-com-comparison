import { Float32ToInt16 } from './utils';

const context = new AudioContext();

class Resource {
    constructor(url) {
        this.url = url;
        this.data = fetch(url)
            .then(response => response.arrayBuffer())
            .then(buffer => context.decodeAudioData(buffer));
    }
    getData(type) {
        return this.data
            .then((decoded) => {
                const left = decoded.getChannelData(0);
                const right = decoded.getChannelData(1);
                if (type === 'int16') {
                    return [
                        Float32ToInt16(left),
                        Float32ToInt16(right),
                    ];
                } else if (type === 'float32') {
                    return [ 
                        new Float32Array(left),
                        new Float32Array(right),
                    ];
                }
            });
    }
}

export default Resource;

export const shortWav = new Resource('short.wav');
export const longWav = new Resource('long.wav');
