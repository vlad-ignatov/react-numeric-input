module.exports = {
    entry: {
        "examples/examples.js": "./examples/examples.jsx"
    },
    output: {
        path: "./",
        filename: "[name]",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [
                    "babel?presets[]=es2015&presets[]=stage-0&presets[]=react&plugins[]=transform-object-assign"
                ],
                exclude: /node_modules/
            }
        ]
    },
    externals : {
        "react"    : "React",
        "react-dom": "ReactDOM"
    },
    resolve : {
        extensions : [ "", ".js", ".jsx" ]
    }
};
