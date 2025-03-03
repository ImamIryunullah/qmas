const path = require("path");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimize: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // alias @ to point to the src folder
      },
    },
    module: {
      rules: [
        {
          test: /\.pdf$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/[name].[hash:8].[ext]", // Handle PDF file loading
              },
            },
          ],
        },
      ],
    },
  },
};
