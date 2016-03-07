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

var rnVersion = ['017','020'];//需维护的RN版本

var previewRender=handlebars.compile(templates.preview),
    jsxRender=handlebars.compile(templates.jsx);

/**
 * 生成html
 * @param keys 模块key数组
 * @param configs 模块配置信息数组
 * @param aids aid数组
 * @returns 成功:{success:true,val:'html内容'} 失败:{success:false,message:'错误信息'}
 */
exports.renderHTML=function(keys,configs,aids){
    var data={
        success:true,//成功与否
        message:'',//错误消息
        val:''//html内容
    };//返回的数据
    //处理每个key(模块)的数据
    try {
        //入参校验
        if(!keys){
            throw ('请传入第1个参数模块key数组');
        }
        if(!configs){
            throw ('请传入第2个参数模块配置数组');
        }
        if(!aids){
            throw ('请传入第3个参数模块aid数组');
        }
        var componentsData = keys.map(function (em, i) {
            try {
                if(i>configs.length-1){
                    throw ('缺少配置');
                }
                if(i>aids.length-1){
                    throw ('缺少aid');
                }
                var o = {
                    key: em,
                    config: componentManage.transformHTML(em, configs[i])
                };
                o.config.aid = aids[i];
            } catch (e) {
                throw( _.template('第<%=index%>个模块(编号<%=aid%>)存在错误 <%=message%>')({index:i+1,aid:aids[i],message: e}));
            }
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
        data.val=previewRender({componentsData:JSON.stringify(componentsData)});
    } catch (e) {
        data.success=false;
        data.message= e;
    }
    return data;
};

/**
 * 生成jsx
 * @param keys 模块key数组
 * @param configs 模块配置信息数组
 * @returns 成功:{success:true,val:'jsx内容'} 失败:{success:false,message:'错误信息'}
 */
exports.renderJSX=function(keys,configs){
    var data={
        success:true,//成功与否
        val:'',//jsx内容
        message:''//错误信息
    };
    var viewHeight=0,//坑位高度，android需要，ios可要可不要
        result = {},
        i,len,pre,current,requireStr;

    function renderVersionOnce(version){
        var requireOneVersionArr = [],
            componentOneVersionArr = [];

        try {
            _.each(keys, function (v, index) {
                try {
                    if(index>configs.length-1){
                        throw ('缺少配置');
                    }
                    requireStr = 'var ' + v + ' = require("' + basePath + v + '/index-' + version + '");';
                    if (!_.contains(requireOneVersionArr, requireStr)) {
                        requireOneVersionArr.push(requireStr);
                    }
                    componentOneVersionArr.push(componentManage.transformJSX(v, configs[index]))
                } catch (e) {
                    throw(_.template('第<%=index%>个模块存在错误 <%=message%>')({index: index, message: e}));
                }
            });
            for (i = 1; i < (len = componentOneVersionArr.length); i++) {
                pre = componentOneVersionArr[i - 1];
                current = componentOneVersionArr[i];
                if (current.paddingTop <= pre.paddingBottom) {
                    current.paddingTop = 0;
                }
                viewHeight += current.height + current.paddingTop + current.paddingBottom
            }
            len > 0 && (viewHeight += componentOneVersionArr[0].height + componentOneVersionArr[0].paddingTop + componentOneVersionArr[0].paddingBottom);

            componentOneVersionArr = _.map(componentOneVersionArr, function (em, i) {
                return '<' + keys[i] + ' conf={' + JSON.stringify(em) + '} />';
            });

            result[version] = jsxRender({requireCom: requireOneVersionArr.join('\n'), compoLists: componentOneVersionArr.join('\n'), viewHeight: viewHeight});
        } catch (e) {
            throw(_.template('生成版本<%=version%>的文件存在错误: <%=message%>')({version:version,message: e}));
        }
    }

    try {
        //入参校验
        if(!keys){
            throw ('请传入第1个参数模块key数组');
        }
        if(!configs){
            throw ('请传入第2个参数模块配置数组');
        }
        rnVersion.map(renderVersionOnce);
        data.val=JSON.stringify(result);
    } catch (e) {
        data.success=false;
        data.message= e;
    }
    return data;
};

