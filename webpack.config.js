const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
  const mode = env.production ? "production" : "development";

  const getStyleLoaders = () => {
    return [
      mode === "production"
        ? { loader: MiniCssExtractPlugin.loader }
        : { loader: "style-loader" },
      {
        loader: "css-loader",
      },
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HTMLWebpackPlugin({
        title: "Webpack test",
        template: "./public/index.html",
      }),
      new CleanWebpackPlugin(),
    ];

    if (mode === "production") {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "[name].[hash].min.css",
        })
      );
    }

    return plugins;
  };

  return {
    mode,
    entry: ["@babel/polyfill", "./src/index.jsx"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: mode === "production" ? "[name].[hash].min.js" : undefined,
    },
    devServer: {
      watchFiles: ["./public/*.html"],
      hot: true,
      open: true,
      port: 3000,
    },
    plugins: getPlugins(),
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.m?jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["autoprefixer"]],
                },
              },
            },
            { loader: "sass-loader" },
          ],
        },
        //loading images
        {
          test: /\.(jpg|jpeg|png|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name(resourcePath, resourceQuery) {
                  // `resourcePath` - `/absolute/path/to/file.js`
                  // `resourceQuery` - `?foo=bar`

                  if (mode === "development") {
                    return "[name].[ext]";
                  }

                  return "[contenthash].[ext]";
                },
              },
            },
          ],
        },
      ],
    },
  };
};
