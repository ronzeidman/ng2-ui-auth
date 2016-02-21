/**
 * Created by ronze on 2/21/2016.
 */
var Builder = require("systemjs-builder");
var fs = require("fs");
var builder = new Builder('..');
builder.config({
        defaultJSExtensions: true,
        paths: {
            './*': './*',
            '../*': '../*',
            '*': './node_modules/*'
        },
        packageConfigPaths: ['./node_modules/*/package.json'],
        map: {
            'rxjs/observable/PromiseObservable.js': 'rxjs/observable/fromPromise.js',
            'crypto': "@empty"
        },
        meta: {
            'angular2/core': {
                build: false
            },
            'angular2/http': {
                build: false
            },
            'rxjs/Observable': {
                build: false
            },
            'rxjs/Subscriber': {
                build: false
            },
            'rxjs/add/operator/map': {
                build: false
            },
            'rxjs/add/operator/mergeMap': {
                build: false
            },
            'rxjs/add/operator/takeWhile': {
                build: false
            },
            'rxjs/add/operator/take': {
                build: false
            },
            'rxjs/add/operator/concatMap': {
                build: false
            },
            'rxjs/add/observable/fromEvent': {
                build: false
            },
            'rxjs/add/observable/interval': {
                build: false
            }
        }
    }
);
builder.buildStatic('./build/export.js', './dist/ng2-ui-auth.js', {minify: false, sourceMaps: true, format: 'cjs'});
builder.buildStatic('./build/export.js', './dist/ng2-ui-auth.min.js', {minify: true, sourceMaps: true, format: 'cjs'});
fs.createReadStream('./build/export.d.ts').pipe(fs.createWriteStream('./dist/ng2-ui-auth.d.ts'));