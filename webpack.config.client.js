const path = require('path');
const webpack = require('webpack');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: "browser",
    //this uses process.env.NODE_ENV value here default unless we give a value explicitly
    mode: "development",
    devtool: "eval-source-map",
     // devtool specifies how source maps are generated, if at all. Generally, a
    // source map provides a way of mapping code within a compressed file back
    // to its original position in a source file to aid debugging.
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    // this is where webpack start building
    output: {
        path: path.join(CURRENT_WORKING_DIR,'/dist'),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }

}

module.exports = config;