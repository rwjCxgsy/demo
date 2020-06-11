/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-11 13:22:08
 * @Description: 
 * @FilePath: /demo/vue.config.js
 */ 
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
    publicPath: './',
    devServer: {
        port: 8081,     // 端口号
    },
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
}