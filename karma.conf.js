/* global process */
module.exports = function (config) {
    config.set({
        browsers: process.env.CONTINUOUS_INTEGRATION ?
            [ 'Firefox' ] :
            [
                'PhantomJS',
                'Chrome',
                'ChromeCanary',
                'Firefox',
                // 'Opera',
                'Safari'
            ],
        singleRun: true,
        frameworks: [ 'mocha' ],
        files: [

            // This one is needed for testing in PhantomJS
            'https://raw.githubusercontent.com/es-shims/es5-shim/master/es5-shim.js',

            'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-with-addons.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-dom.js',
            './__tests__/tests.webpack.js'
        ],
        preprocessors: {
            './__tests__/tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },
        reporters: [ 'dots' ],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: "babel",
                        query: {
                            // https://github.com/babel/babel-loader#options
                            cacheDirectory: true,
                            presets: ['es2015', 'stage-0', 'react'],
                            plugins: ["transform-runtime"]
                        },
                        exclude: /node_modules/
                    }
                ]
            },
            externals : {
                'react'     : 'React',
                'react-dom' : 'ReactDOM'
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
