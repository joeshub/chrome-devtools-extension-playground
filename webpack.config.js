const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),

  devtool: "source-map",

  devServer: {
    port: 8080,
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
    filename: "main.js",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules/,
        loader: "swc-loader",
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      inject: false,
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify({
        MODE: process.env.NODE_ENV,
      }),
    }),
  ],
};
