let mix = require('laravel-mix');
mix
    .js('brainfuck.js','browser.js')
    .webpackConfig({
        resolve: {
            fallback: {
                path: require.resolve("path-browserify"),
                os: require.resolve("os-browserify/browser"),
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify"),
                fs: false,
                child_process: false,
            }
        },
        output: {
            library: {
                name: 'Brainfuck',
                type: 'umd',
            },
            globalObject: 'this',
        },
    })
;
