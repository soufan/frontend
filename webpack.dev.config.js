/**
 * Created by sury on 2017/2/7.
 * http://www.tuicool.com/articles/q636fy3
 * yarn run webpack
 * yarn run webpack-dev-server
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

var options = {
    cwd: "./src", // views
    sync: true, // 这里不能异步，只能同步
};

var globInstance = new glob.Glob('views/**/page.js', options);

function getEntry() {
    var entry = {};
    globInstance.found.forEach((page) => {
        var name = /views\/(.*\/page)\.js/.exec(page)[1];
        console.log(name,page);
        entry[name] = './'+page;
    })
    //entry["js/vendors"] = ['react', 'react-dom', 'react-router', 'classnames'];
    console.log(entry);
    return entry;
}

module.exports = {
    devtool: "inline-source-map",
    context: path.resolve(__dirname, './src'),
   /* entry: {
     //src: ['./home.js', './events.js', './vendor.js'],
     "index": './page.js',
     "home": './home.js',
     "vendor": ['react', 'react-dom', 'react-router', 'classnames']
     },*/
   entry: getEntry(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        //以文件内容的MD5生成Hash名称的script来防止缓存
        filename: 'js/[name].[chunkHash:8].js',
        //异步加载的模块是要以文件形式加载，生成的文件名是以chunkFilename配置的
        chunkFilename: "[name].[chunkHash:8].js",
        publicPath: '/',                          //生成的html里的引用路径用 publicPath
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        //配置别名，在项目中可缩减引用路径
        alias:{
            //'react':path.join(nodeModulesPath,'react/react.js'),
            components: path.join(__dirname,'./src/js/components'),
            styles:path.join(__dirname,'./src/styles'),
            vendor:path.join(__dirname,'./src/js/vendor'),
            layout:path.join(__dirname,'./src/template/layout/html'),
            /* config */
            configModule: path.join(__dirname, './src/config/common.config'),
        }
    },
    externals:{
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.ejs$/,
                use: ['ejs-loader'],
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015','react'] }
                }],
            },
            // Loaders for other file types can go here
        ],
    },
    plugins: [
        /*new webpack.optimize.CommonsChunkPlugin({
            //names: ['vendor', 'manifest'],
            names: ['js/vendors'],
            //chunks: ['vendor'],
            //minChunks: Infinity,
        }),*/
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        /*new webpack.DefinePlugin({
            'process.env':'dev',
        }),*/
        new webpack.DllReferencePlugin({
            context: __dirname, // 这里要和 dll.config.js 中 webpack.DllPlugin 配置的 context 一致
            manifest: 'manifest.json'
        }),
        new ExtractTextPlugin("css/styles.min.css"),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            filename:  '/views/index/page.html',    //生成的html存放路径，相对于 path
            template:'./views/index/html.js',    //html模板路径
            hash: true, // 为静态资源生成hash值
            xhtml: true,  // 需要符合xhtml的标准
            chunks:['index/page'],//加载指定模块中的文件，否则页面会加载所有文件
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),  // New
        //host: '192.168.90.225',
        host: 'localhost',
        port: 9090,
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    },
};