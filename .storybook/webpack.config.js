module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("awesome-typescript-loader")
        }
      ]
    },
    {
      test: /\.css|\.s(c|a)ss$/,
      use: [
        {
          loader: "lit-scss-loader",
          options: {
            minify: true // defaults to false
          }
        },
        "extract-loader",
        "css-loader",
        "sass-loader"
      ]
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: require.resolve("polymer-webpack-loader")
        }
      ]
    }
  );
  config.resolve.extensions.push(
    ".ts",
    ".tsx",
    ".sass",
    ".css",
    ".scss",
    ".html"
  );
  return config;
};
