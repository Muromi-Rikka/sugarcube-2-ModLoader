const path = require('path');
const rspack = require("@rspack/core")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
module.exports = {
    entry: {
      packModZip: './src/insertTools/packModZip.ts',
      insert2html: './src/insertTools/insert2html.ts',
      "insert2html-polyfill": './src/insertTools/insert2html-polyfill.ts',
      sc2ReplaceTool: './src/insertTools/sc2ReplaceTool.ts',
      polyfillInsert: './src/insertTools/polyfillInsert.ts',
      },
      output: {
        path: path.resolve(__dirname, 'dist-insertTools-rs'),
        filename: '[name].js',
      },
  target: 'node',  mode:isProduction?"production":"development",
  devtool: 'source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'src/insertTools/tsconfig.json',
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
        configFile:"src/insertTools/tsconfig.json"
    }
  },
  optimization: {
    minimizer: [new rspack.SwcJsMinimizerRspackPlugin({})],
  },
}