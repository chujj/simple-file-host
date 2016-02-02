/**
  渲染引擎
 1.基于配置生成html
 2.基于配置生成jsx
 **/
var componentManage=require('../component');
var handlebars=require('handlebars');
var _=require('underscore');
_.str=require('underscore.string');
_.mixin(_.str.exports());
var templates=require('./templates.json');

var basePath = 'nas_engine/lib/component/';

var previewRender=handlebars.compile(templates.preview),
    jsxRender=handlebars.compile(templates.jsx);

/**
 * 生成html
 * @param keys 模块key数组
 * @param configs 模块配置信息数组
 * @param aids aid数组
 * @returns {*}
 */
exports.renderHTML=function(keys,configs,aids){
    var componentsData=Array.from(keys).map(function(em,i){
        var o={
            key:em,
            config:componentManage.transformHTML(em,configs[i])
        };
        o.config.aid=aids[i];
        return o;
    });
    //按顺序合并上下边距
    var i,len,pre,current;
    for(i=1;i<(len=componentsData.length);i++){
        pre=componentsData[i-1];
        current=componentsData[i];
        if(current.config.paddingTop <= pre.config.paddingBottom){
            current.config.paddingTop=0;
        }
    }
    return previewRender({componentsData:JSON.stringify(componentsData)});
};

/**
 * 生成jsx
 * @param keys 模块key数组
 * @param configs 模块配置信息数组
 * @returns {*} 字符串
 */
exports.renderJSX=function(keys,configs){
    var requireArr = [],
        componentArr = [],
        viewHeight=0,//坑位高度，android需要，ios可要可不要
        i,len,pre,current,requireStr;

    _.each(keys,function(v, index){
        requireStr='var ' + v + ' = require("' + basePath + v +'");';
        if(!_.contains(requireArr, requireStr)){
            requireArr.push(requireStr);
        }
        componentArr.push(componentManage.transformJSX(v,configs[index]))
    });
    for(i=1;i<(len=componentArr.length);i++){
        pre=componentArr[i-1];
        current=componentArr[i];
        if(current.paddingTop<=pre.paddingBottom){
            current.paddingTop=0;
        }
        viewHeight+= current.height + current.paddingTop + current.paddingBottom
    }
    len>0 && (viewHeight+= componentArr[0].height + componentArr[0].paddingTop + componentArr[0].paddingBottom);

    componentArr=_.map(componentArr,function(em,i){
        return '<' + keys[i] + ' conf={' + JSON.stringify(em) + '} />';
    });

    return jsxRender({requireCom:requireArr.join('\n'),compoLists:componentArr.join('\n'),viewHeight:viewHeight});
};

