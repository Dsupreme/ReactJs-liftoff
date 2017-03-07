//let wepack = require("webpack")
let path = require("path");

let DIST = path.resolve(__dirname, "dist");
let SRC = path.resolve(__dirname, "src");

let config = {
    entry: SRC + "/app/index.js",
    output: {
        path: DIST + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        loaders: [{
            test: /\.js?/,
            include: SRC,
            loader: "babel-loader",
            query: {
                presets: ["react", "es2015", "stage-2"]
            }
        }]
    }
}

module.exports = config;