const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "treemap.bundle.js",
    library: "treemap",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.join(__dirname, "demo"),
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
