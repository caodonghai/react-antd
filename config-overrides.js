/* 
    *@file config-overrides
    *基于customize和react-app-rewide的定制化配置
*/

//从customize-cra引入一些相关的方法
const {
    override,
    addLessLoader,
    fixBabelImports
}  = require('customize-cra')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
)