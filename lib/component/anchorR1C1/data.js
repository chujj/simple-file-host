/**
 组件数据
 1.返回配置数据
 2.格式化返回的配置结果成React组件所需的数据结构
**/

'use strict';

/**
 * 返回模块配置信息
 * @type {{key:string 唯一标识,name:string 模块名称,desc:string 描述信息,img:string 预览图,config:object 模块配置}}
 */
exports.config={};

/**
 * 格式化模板配置结果成React组件所需的数据结构
 * @param data
 * @returns {*}
 */
exports.transform=function(data){
    return data;
};
