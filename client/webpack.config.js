const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = false;


module.exports = {
    entry: {myAppName: "./src/index.js"},
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader",
                    options: {
                        presets:["@babel/preset-react", "@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:["@babel/preset-react", "@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {sourceMap: !production}
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: !production}
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".scss", "json"],
        fallback: {
            "path": require.resolve("path-browserify"),
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack & React",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
    ],
    devServer: {
        port: 3000,
        host: "localhost",
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/product': {
                target: 'http://localhost:4000/images',
                changeOrigin: true
            },
            '/rating': {
                target: 'http://localhost:4000/images',
                changeOrigin: true
            }
        }
    },
    mode: production ? 'production' : 'development',
};