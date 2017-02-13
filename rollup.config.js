/**
 * Created by ronze on 3/24/2016.
 */
import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";

export default {
    entry: 'src/ng2-ui-auth.module.ts',
    dest: 'bundle/ng2-ui-auth.js',
    sourceMap: 'bundle/ng2-ui-auth.js.map',
    format: 'cjs',
    external: [
        '@angular/core',
        '@angular/http',
        'rxjs/Observable',
        'rxjs/Subscriber',
        'rxjs/add/observable/of',
        'rxjs/add/observable/merge',
        'rxjs/add/observable/empty',
        'rxjs/add/observable/throw',
        'rxjs/add/observable/fromEvent',
        'rxjs/add/observable/interval',
        'rxjs/add/operator/catch',
        'rxjs/add/operator/delay',
        'rxjs/add/operator/takeWhile',
        'rxjs/add/operator/map',
        'rxjs/add/operator/take',
        'rxjs/add/operator/do',
        'rxjs/add/operator/switchMap'
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        nodeResolve({
            // use "jsnext:main" if possible
            // – see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true,

            // use "main" field or index.js, even if it's not an ES6 module
            // (needs to be converted from CommonJS to ES6
            // – see https://github.com/rollup/rollup-plugin-commonjs
            main: true,


            // some package.json files have a `browser` field which
            // specifies alternative files to load for people bundling
            // for the browser. If that's you, use this option, otherwise
            // pkg.browser will be ignored
            browser: true,

            // not all files you want to resolve are .js files
            extensions: ['.js'],

            // whether to prefer built-in modules (e.g. `fs`, `path`) or
            // local ones with the same names
            preferBuiltins: false
        })
    ]
}