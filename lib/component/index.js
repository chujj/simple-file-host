/**
 组件
 1.获取所有组件配置列表
 2.传入组件key和配置结果,返回ios使用的React组件实例
 3.传入组件key和配置结果,返回android使用的React组件实例
 2.传入组件key和配置结果,返回html使用的React组件实例
 **/
'use strict';

var _=require('underscore');
_.str=require('underscore.string');
_.mixin(_.str.exports());

//引入模块,添加模块后续改动此处的代码
var AnchorR1=require('./AnchorR1/data.js');

var componentMap={
    AnchorR1:AnchorR1
};

var dataList=_.values(componentMap).map(function(em,i){
   return  em.config;
});

/**
 * 组件配置列表
 */
exports.dataList=dataList;

/**
 * 生成html的React实例
 * @param key 模块key
 * @param config 配置
 * @returns {*} React实例
 */
exports.transformHTML=function(key,config){
    var component=componentMap[key];
    if(!component){
        throw ('key为'+key+'的模块不存在');
    }
    return component.transformHTML(config);
};

/**
 * 生成jsx的React实例
 * @param key 模块key
 * @param config 配置
 * @returns {*} React实例
 */
exports.transformJSX=function(key,config){
    var component=componentMap[key];
    if(!component){
        throw ('key为'+key+'的模块不存在');
    }
    return component.transformJSX(config);
};
