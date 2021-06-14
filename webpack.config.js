const path = require('path')
const dotenv = require('dotenv')
const { DefinePlugin } = require('webpack')

const config = {
  entry: './src/javascript/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './assets/js')
  },
  mode: 'development',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    port: 4000,
    open: true,
    liveReload: true,
    writeToDisk: (filePath) => {
      return /\.js$/.test(filePath);
    },
  },
  watchOptions: {
    ignored: ['./src/**/*.js', '**/node_modules', '.env'],
  },
}

module.exports = config