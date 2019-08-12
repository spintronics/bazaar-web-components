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
