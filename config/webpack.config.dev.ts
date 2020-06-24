import path from 'path';
import webpack from 'webpack';
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import configBase from './webpack.config.base';
import WebpackDevServer from 'webpack-dev-server';

// paths

// const entry = path.resolve('./src/index.ts');

// const config: webpack.Configuration = {
//   entry,
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, '../dist'),
//   },
//   devtool: 'inline-source-map',
//   resolve: {
//     extensions: ['.ts', '.js'],
//   },
//   mode: 'development',
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//       { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' },
//       {
//         test: /\.svg$/,
//         loader: 'svg-url-loader',
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: '¡Gracias totales!',
//       filename: 'index.html',
//       template: 'src/index.html',
//     }),
//     new MiniCssExtractPlugin({
//       filename: '[name].css',
//       chunkFilename: '[name].css',
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//     // new FaviconsWebpackPlugin(favicon),
//   ],
//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),
//     port: 3000,
//     clientLogLevel: 'warning',
//     historyApiFallback: true,
//     stats: 'errors-only',
//   },
//   // node: {
//   //   net: 'empty',
//   //   fs: 'empty',
//   // },
// };

const devServer: WebpackDevServer.Configuration = {
  contentBase: path.join(__dirname, 'dist'),
  port: 3000,
  clientLogLevel: 'warning',
  historyApiFallback: true,
  stats: 'errors-only',
};

const plugins = configBase.plugins?.concat(
  new webpack.HotModuleReplacementPlugin(),
);

const config: webpack.Configuration = {
  ...configBase,
  devtool: 'inline-source-map',
  devServer,
  mode: 'development',
  output: {
    ...configBase.output,
    path: path.resolve(__dirname, '../dist'),
  },
  plugins,
};

export default config;
