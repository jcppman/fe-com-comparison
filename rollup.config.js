import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const target = process.env.ROLLUP_TARGET;

if (!target) {
    throw new Error(`no target given`);
}

export default {
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    plugins: [
        babel({
            exclude: [
                'node_modules/*',
                'src/lib/*',
            ],
            plugins: [
                'transform-react-jsx',
                'babel-plugin-transform-inline-environment-variables',
            ],
        }),
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
    ],
    sourceMap: true,
    entry: `src/${target}.js`,
    dest: `public/${target}.js`,
};
