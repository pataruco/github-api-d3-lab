import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';

import configBase from './webpack.config.base';
import webpack from 'webpack';
import path from 'path';

const config: webpack.Configuration = {
  ...configBase,
  mode: 'production',
  output: {
    ...configBase.output,
    path: path.resolve(__dirname, '../build'),
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({ extractComments: true }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};

export default config;
