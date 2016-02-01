/**
 NAS引擎
 1.获取模块信息列表
 2.获取html结果
 3.获取jsx结果
**/

var engine=require('./core/engine');
var component=require('./component');

/**
 * 获取模块信息列表
 * @type {exports.dataList|*}
 */
exports.moduleList=component.dataList;

/**
 * 获取html结果
 * @type {Function}
 */
exports.renderHTML=engine.renderHTML;

/**
 * 获取jsx结果
 * @type {Function}
 */
exports.renderJSX=engine.renderJSX;