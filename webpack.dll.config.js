const webpack = require('webpack');

// dll lib 的名称
var name = '[name]_[chunkhash]';

module.exports = {
    entry: {
        vendor: [ 'react', 'react-dom', 'react-router', 'classnames']
    },
    output: {
        path: './src',
        filename: 'js/vendor/[name].js',
        library: name // 这里跟 webpack.DllPlugin 里的 name 保持一致
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: name, // 这里跟 output.library 保持一致
            context: __dirname // 这里和后面我们要配置的 webpack.DllReferencePlugin 里的 context 保持一致
        })
    ]
};