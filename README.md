# Engine for NAS

NAS项目FED工程

### 使用方法
var nas=require('nas_engine');

1.获取模板列表

/**
 * 组件配置列表
 * @return Arry
 */
 nas.dataList

2.生成html
/**
 * 生成html
 * @param keys 模块key数组
 * @param configs 模块配置信息数组
 * @param aids aid数组
 * @returns {*}
 */
 nas.renderHTML
3.生成JSX
/**
 * 生成jsx
 * @param keys 模块key数组
 * @param configs 模块配置信息数组
 * @returns {*} 字符串
 */
 nas.renderJSX
