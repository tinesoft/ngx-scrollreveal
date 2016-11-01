var path = require('path');
var webpack = require('webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const LIBRARY_NAME = 'ng2-scrollreveal';

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function ngExternal(ns) {
    var ng2Ns = `@angular/${ns}`;
    return { root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns };
}

//Config
module.exports = {
    devtool: 'source-map',
    entry: './src/lib/index.ts',

    resolve: {
        extensions: ['*', '.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader?tsconfig=./src/lib/tsconfig.json', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            }
        ]
    },
    // require those dependencies but don't bundle them
    externals: [
        {
            '@angular/core': ngExternal('core'),
            '@angular/common': ngExternal('common')
        }
    ],

    output: {
        path: root('dist/lib/bundles'),
        filename: LIBRARY_NAME + '.min.js',
        library: LIBRARY_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
};
