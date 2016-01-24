module.exports = {
    entry: "./src/NumericInput.jsx",
    output: {
        path         : "./dist",
        filename     : "react-numeric-input.js",
        libraryTarget: "umd"
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
        "react": "React"
    },
    resolve : {
        extensions : [ "", ".jsx", ".js" ]
    }
};
