var path = require('path');

module.exports = {
    entry : path.join(__dirname, '/public/src/index.jsx'),
    output : {
        filename: 'bundle.js',
        publicPath: path.join(__dirname, '/public/dist')
    },
    module : {
        rules : [
          {
            test : /\.jsx?/,
            exclude: /node_modules/,
            use: {
                loader : 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
            }
          }
        ]
    }
};