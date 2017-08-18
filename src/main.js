import React from 'react';
import ReactDOM from 'react-dom';

import pureJs from './benchmark/pureJs';
import pureJsWorker from './benchmark/pureJsWorker';
import asmJs from './benchmark/asmJs.js';
import asmJsWorker from './benchmark/asmJsWorker';
import wasm from './benchmark/wasm';
import wasmWorker from './benchmark/wasmWorker';

import Row from './Row';
import WR from './WaterRipples';

import { shortWav, longWav } from './Resource'; 

const methods = [
    {
        title: 'PureJS',
        encoder: pureJs,
        name: 'pureJS',
        dataType: 'int16',
    },
    {
        title: 'PureJS + WebWorker',
        encoder: pureJsWorker,
        name: 'pureJsWorker',
        dataType: 'int16',
    },
    {
        title: 'Asm.Js',
        encoder: asmJs,
        name: 'asmJs',
        dataType: 'float32',
    },
    {
        title: 'Asm.Js + WebWorker',
        encoder: asmJsWorker,
        name: 'asmJsWorker',
        dataType: 'float32',
    },
    {
        title: 'WebAssembly',
        encoder: wasm,
        name: 'wasm',
        dataType: 'float32',
    },
    {
        title: 'WebAssembly + WebWorker',
        encoder: wasmWorker,
        name: 'wasmWorker',
        dataType: 'float32',
    },
];

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            resource: shortWav,
        };
    }
    render() {
        const { resource } = this.state;
        return (
            <div>
                <WR />
                <div style={{padding: '10px'}}>
                    <button onClick={() => this.setState({ resource: shortWav })}>Use Short</button>
                    <button onClick={() => this.setState({ resource: longWav })}>Use Long</button>
                </div>
                <div>WAV: {resource.url}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th></th>
                            <th></th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {methods.map(m => <Row {...m} key={m.name} resource={resource} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root'),
);
