var webpack = require('webpack')
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dev = true;
module.exports = {
    entry: {
        main: "./src/js/main.js",
        vendors: ['redux', 'react-redux', 'react-router', 'superagent', 'react-dom', 'react', 'react-date-range']
    }
    ,
    output: {
        path: dev ? 'src/__build' : path.resolve(__dirname + '/src/dist/'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: "js/[id].chunk.js"
    },
    module: {
        loaders: [
            {test:/\.js$/, loader:"babel", exclude: /(node_modules|bower_components)/,query: {presets: ['es2015', 'react']}},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css")},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
            {test: /\.(jpg|png)$/, loaders: [
                "url?name=images/[hash:7]-[name].[ext]&limit=8192"
            ]}
        ]
    },
    resolve: {
        extensions :['', '.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'app',
            files: {
                "css": [ "ma3in.css" ]
            },
            template: 'src/index.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.optimize.UglifyJsPlugin({	//压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']	//排除关键字
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin('js/common.js')
    ]
}