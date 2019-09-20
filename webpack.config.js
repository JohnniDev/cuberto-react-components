const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js[x]?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '',
        filename: 'build.js',
        libraryTarget: 'umd'
    },
    watch: true,
};