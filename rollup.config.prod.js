/**
 * Created by ronze on 3/24/2016.
 */
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: './src/export.ts',
    dest: './dist/ng2-ui-auth.min.js',
    sourceMap: './dist/ng2-ui-auth.min.js.map',
    format: 'cjs',
    plugins: [
        typescript(),
        nodeResolve({
            // use "jsnext:main" if possible
            // – see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true,

            // use "main" field or index.js, even if it's not an ES6 module
            // (needs to be converted from CommonJS to ES6
            // – see https://github.com/rollup/rollup-plugin-commonjs
            main: true,

            // if there's something your bundle requires that you DON'T
            // want to include, add it to 'skip'
            skip: [
                '@angular/core',
                '@angular/http',
                'rxjs' ],

            // some package.json files have a `browser` field which
            // specifies alternative files to load for people bundling
            // for the browser. If that's you, use this option, otherwise
            // pkg.browser will be ignored
            browser: true,

            // not all files you want to resolve are .js files
            extensions: [ '.js' ],

            // whether to prefer built-in modules (e.g. `fs`, `path`) or
            // local ones with the same names
            preferBuiltins: false
        }),
        uglify()
    ]
}