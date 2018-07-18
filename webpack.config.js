// Reference
//   https://webpack.js.org/configuration/devtool/#devtool

const path = require('path')
const { lstatSync, readdirSync } = require('fs')

const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const _ = require('lodash')

const src = path.resolve(__dirname, 'src/api')
const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source)
    .map(name => path.resolve(source, name))
    .filter(isDirectory)
const sourceFiles = _.concat([src], getDirectories(src))

console.log('src', src, sourceFiles) // eslint-disable-line no-console

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  // devtool: 'eval-source-map',
  // resolve: { alias: {} },
  // entry: ['babel-polyfill', './src/api/index.js'],
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    // (was split into `root`, `modulesDirectories` and `fallback` in the old options)
    // modules: [path.resolve(__dirname, 'src/api'), 'node_modules'],
    // add alias for application code directory
    alias: {
      common$: path.resolve(__dirname, 'src/api/common')
    },
    extensions: ['.js', '.json', '.gql', '.graphql']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // include: sourceFiles,
        // issuer: src,
        exclude: /node_modules/,
        // loader: 'babel',
        // query: {
        //   compact: true,
        //   presets: ['es2015'],
        //   plugins: ['env', 'syntax-flow', 'transform-flow-strip-types']
        // }
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        include: sourceFiles,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  stats: 'minimal'
}
