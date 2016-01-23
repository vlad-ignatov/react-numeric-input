module.exports = {
    entry: "./src/NumericInput.jsx",
    output: {
        path: "./",
        filename: "index.js",
        libraryTarget: "commonjs2"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: [
                    "babel?presets[]=es2015&presets[]=stage-0&presets[]=react"
                ],
                exclude: /node_modules/
            }
        ]
    },
    externals : {
        "react": "react"
    },
    resolve : {
        extensions : [ "", ".jsx", ".js" ]
    }
};
