global.Promise         = require('bluebird');

var webpack            = require('webpack');
var path               = require('path');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath         = 'http://localhost:8050/public/assets';
var cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER:  JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new CleanWebpackPlugin([ 'public/assets/' ], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.DedupePlugin());
}
var babelLoader = null;
if( process.env.NODE_ENV !== 'production'){
    babelLoader = { test: /\.jsx?$/, use:[
        {loader:'babel-loader'}
    ],
    exclude: [/node_modules/, /public/] }
}else{
    babelLoader = { test: /\.jsx?$/, use:[
        {loader:'babel-loader'}
    ],
    exclude: [/node_modules/, /public/] }
}

module.exports = {
    context:path.join(__dirname, 'src'),
    entry: ['babel-polyfill', './client.js'],
    resolve: {

        modules: ['node_modules'],
        extensions:['.js', '.jsx']
    },
    plugins,
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    module: {
        rules: [
            {
                test:   /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                minimize:true
                            }
                        },
                        // {
                        //     loader:"postcss-loader"
                        // }
                    ]
                })
            },
            {
                test:   /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                minimize:true
                            }
                        },
                        // {
                        //     loader:"postcss-loader"
                        // },
                        {
                            loader:"less-loader"
                        }
                    ]
                })
            },
            { test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, use: 'url-loader?limit=26000&mimetype=image/svg+xml' },
            { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
            babelLoader
        ]
    },
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : 'eval',
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
};