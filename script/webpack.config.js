const common = require('./webpack.common.js'); //引入公共配置
const { merge } = require('webpack-merge'); //引入配置文件合并工具
const envMapConfig = require('./envMapConfig.js');
module.exports = merge(common, require(`./webpack.${envMapConfig[process.env.ENV_LWD]}.js`));
