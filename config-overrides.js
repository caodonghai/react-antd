/* 
    *@file config-overrides
    *基于customize和react-app-rewide的定制化配置
*/

//从customize-cra引入一些相关的方法
const {
    override,
    addLessLoader,
    fixBabelImports,
    addDecoratorsLegacy,//配置装饰器模式
}  = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars,
    }),
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
)