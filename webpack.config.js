const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/treemap.js',
  output: {
    filename: 'treemap.js',
    library: {
      name: 'treemap',
      type: 'umd'
    },
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'demo'),
    port: 3000,
  },
  module: {
      rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ],
          },
      ]
  }
};
