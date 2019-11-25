var path = require('path');

module.exports = {
    entry : path.join(__dirname, '/public/src/index.jsx'),
    output : {
        filename: 'bundle.js',
        path: path.join(__dirname, '/public/dist')
    },
    module : {
        rules : [
          {
            test : /\.jsx?/,
            exclude: /node_modules/,
            include : path.join(__dirname, '/public/src'),
            use: {
                loader : 'babel-loader',
                options: {
                    presets: ['@babel/react', '@babel/env']
                }
            }
          }
        ]
    }
};
