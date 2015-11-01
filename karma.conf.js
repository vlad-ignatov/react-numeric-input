module.exports = function (config) {
    config.set({
        browsers: [ 'Chrome' ],
        singleRun: false,
        frameworks: [ 'mocha' ],
        files: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-with-addons.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-dom.js',
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
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
