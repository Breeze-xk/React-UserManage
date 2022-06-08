const path = require('path');
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    historyApiFallback: true,
    compress: true,
    // port: '8088',
    // open: true,
    // useLocalIp: true,
  },
};
