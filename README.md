Front End Adventure: CPU intense tasks
======================================

This app uses MP3 encoding as an example to demonstrate diffrent approaches to
handle cpu intense tasks on webpages, they are:

- pure Javascript ([lamejs](https://github.com/zhuker/lamejs))
- pure Javascript + Web Worker
- asm.js ([mp3-lame-encoder](https://github.com/higuma/mp3-lame-encoder-js))
- asm.js + Web Worker
- Web Assembly (modified [mp3-lame-encoder](https://github.com/higuma/mp3-lame-encoder-js))
- Web Assembly + Web Worker

USAGE
=====

Serve the files in `public` folder as static files, for example:

- `npm install http-server -g`
- `http-server public`
- open http://localhost:8080

Credits
=======

For many reasons I need to modify the encoding libs used in this demo to fit the
needs, for example [mpe-lame-encoder](https://github.com/higuma/mp3-lame-encoder-js) does not
support Web Assembly yet. The included codes are modified but all algorithm
implementations are crafted by the original projects.

The Water Ripples component is from [React-motion](https://github.com/chenglou/react-motion)'s
[Demo-7](https://github.com/chenglou/react-motion/tree/master/demos/demo7-water-ripples)
