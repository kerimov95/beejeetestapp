const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    mode: process.env.NODE_ENV || 'development',

    entry: './src/index.tsx',

    resolve: {
        alias: {
            store: path.resolve(__dirname, 'src/store'),
            components: path.resolve(__dirname, 'src/components'),
            common: path.resolve(__dirname, 'src/common'),
            api: path.resolve(__dirname, 'src/api'),
            pages: path.resolve(__dirname, 'src/pages'),
            types: path.resolve(__dirname, 'src/types'),
        },
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2|ttf|woff|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'www/index.html'
        }),
        new MiniCssExtractPlugin({
            experimentalUseImportModule: true,
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 5000,
    },
};
