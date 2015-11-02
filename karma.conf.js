/* global process */
module.exports = function (config) {
    config.set({
        browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
        singleRun: true,
        frameworks: [ 'mocha' ],
        files: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-with-addons.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-dom.js',
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
                        loaders: [
                            'jsx-loader?stripTypes',
                            'babel?stage=0'
                        ],
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
