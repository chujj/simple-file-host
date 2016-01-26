/**
 布点(1行1列)模块
 1.返回模板配置
 2.传入配置结果,返回ios使用的React组件实例
 3.传入配置结果,返回android使用的React组件实例
 2.传入配置结果,返回html使用的React组件实例
 */

var dataManager=require('data.js');

/**
 * 返回模板配置
 * @type {{key: string, 唯一标识, name: string, 模块名称, desc: string, 描述信息, img: string, 预览图, config: Object, 模块配置}}
 */
exports.data=dataManager.config;

/**
 *
 * @param config 配置结果
 * @returns {{}} IOS所需的React组件实例
 */
exports.renderIOS=function(config){
    var target={},data=dataManager.transform(config);
    return target;
};

/**
 *
 * @param config 配置结果
 * @returns {{}} Android所需的React组件实例
 */
exports.renderAndroid=function(config){
    var target={},data=dataManager.transform(config);
    return target;
};

/**
 *
 * @param config 配置结果
 * @returns {{}} HTML所需的React组件实例
 */
exports.renderHTML=function(config){
    var target={},data=dataManager.transform(config);
    return target;
};
