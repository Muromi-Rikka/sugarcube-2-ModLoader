const path = require('path');
const rspack = require("@rspack/core")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
module.exports = {
    entry: {
        BeforeSC2: './src/BeforeSC2/init.ts',
        polyfillWebpack: './src/BeforeSC2/polyfill.ts',
      },
      output: {
        path: path.resolve(__dirname, 'dist-BeforeSC2-rs-comp'),
        filename: '[name].js',
      },
  target: 'web',
  devtool: 'inline-source-map',  mode:isProduction?"production":"development",
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'src/BeforeSC2/tsconfig.comp.json',
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve:{
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    tsConfig:{
        configFile:"src/BeforeSC2/tsconfig.comp.json"
    }
  },
  optimization: {
    minimizer: [new rspack.SwcJsMinimizerRspackPlugin({})],
  },
}