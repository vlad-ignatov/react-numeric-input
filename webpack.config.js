module.exports = {
    entry: {
        'examples/examples.js': './examples/examples.jsx'
    },
    output: {
        path: './',
        filename: '[name]'
    },
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
        'react' : 'React'
    },
    resolve : {
        extensions : [ '', '.js', '.jsx' ]
    }
};
