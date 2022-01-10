let mix = require('laravel-mix');
mix
    .js('brainf-ck.js','brainf-ck.min.js')
    .webpackConfig({
        output: {
            library: {
                name: 'Brainfuck',
                type: 'umd',
            },
            globalObject: 'this',
        }
    })
;
