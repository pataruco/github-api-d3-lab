import path from 'path';
import webpack from 'webpack';
import configBase from './webpack.config.base';
import WebpackDevServer from 'webpack-dev-server';

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
    path: path.resolve(__dirname, '../build'),
  },
  plugins,
};

export default config;
