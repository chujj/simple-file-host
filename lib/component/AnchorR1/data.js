/**
 组件数据
 1.模块配置信息
 2.转换成生成html需要的数据
 3.转换成生成jsx需要的数据
 **/
'use strict';
var htmlUtil=require('../../util/htmlUtil');
var _=require('underscore');
_.str=require('underscore.string');
_.mixin(_.str.exports());

var widthList=[0,750,372,246,183];//不同个数的宽度

/**
 * 模块配置信息
 * @type {{key:string 唯一标识,name:string 模块名称,desc:string 描述信息,img:string 预览图,config:object 模块配置}}
 */
exports.config={
    key:'AnchorR1',
    name:'布点一行一列',
    desc:'满足1行1个的布点',
    img:'http://b0.hucdn.com/party/default/upload_ed0cb0267a4da302457b4ab32a0c9893_377x142.png',
    config:[
        {
            "key": "height",
            "name": "布点高度",
            "desc": "必填,单位px,布点宽度:1个(750px),2个(372px),3个 (246px),4个(183px)",
            "input": "textinput",
            "inputDefault":"260"
        },
        {
            "key": "info",
            "name": "布点内容",
            "desc": "必填,布点内容最多4个,第4个以后的内容将被忽略",
            "input": "multiform",
            "inputAttrs": "hide-name move item-name=布点 item-key=note",
            "inputContent": "<ui-formgroup><div class=\"item\"><h5 class=\"title\"><ui-center class=\"fill\">布点图片</ui-center></h5><div class=\"content\"><div class=\"form\"><h6>必填,为空时时当前内容将被忽略,图片会基于宽高拉升</h6><ui-upload key=img hide-name allow-url max=1 lossy=80></ui-upload></div></div></div><div class=\"item\"><h5 class=\"title\"><ui-center class=\"fill\">布点链接</ui-center></h5><div class=\"content\"><div class=\"form\"><h6>选填,为空时点击不跳转页面</h6><ui-textinput key=\"link\"></ui-textinput></div></div></div><div class=\"item\"><h5 class=\"title\"><ui-center class=\"fill\">备注</ui-center></h5><div class=\"content\"><div class=\"form\"><ui-textinput key=\"note\"></ui-textinput></div></div></div></ui-formgroup>"
        },
        {
            "key": "bgColor",
            "name": "行背景色",
            "input": "colorpick",
            "inputAttrs": "hide-name default='{\"type\":\"rgba\",\"val\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0}}'"
        }
    ]
};

/**
 * 转换成生成html需要的数据
 * @param config
 * @returns {*}
 */
exports.transformHTML=function(config){
    var width,num= 0,info,target={
        bgColor: htmlUtil.colorStr(config.bgColor),
        height : htmlUtil.pxToRem(config.height || 0),
        paddingTop : htmlUtil.pxToRem(6),
        paddingBottom : htmlUtil.pxToRem(6),
        anchors : []
    };
    if(!target.height){
        return target;
    }
    try {
        info = JSON.parse(config.info);
        num = Math.min(4, info.length);
        width=widthList[num];
        for(var i=0;i<num;i++){
            var item=info[i];
            item.img=JSON.parse(item.img);
            target.anchors.push({
                width: htmlUtil.pxToRem(width),
                height: target.height,
                img: item.img.length>0?item.img[0]['path']:'',
                link: _.trim(item.link) || 'javascript:;'
            });
        }
    } catch (e) {
        console.log(e);
    }
    return target;
};

/**
 * 转换成生成jsx需要的数据
 * @param config
 * @returns {*}
 */
exports.transformJSX=function(config){
    var width,num= 0,info,target={
        bgColor: htmlUtil.colorStr(config.bgColor),
        height : parseFloat(config.height || 0),
        paddingTop : 6,
        paddingBottom : 6,
        anchors : []
    };
    if(!target.height){
        return target;
    }
    try {
        info = JSON.parse(config.info);
        num = Math.min(4, info.length);
        width=widthList[num];
        for(var i=0;i<num;i++){
            var item=info[i];
            item.img=JSON.parse(item.img);
            target.anchors.push({
                width: width,
                height: target.height,
                img: item.img.length>0?item.img[0]['path']:'',
                link: _.trim(item.link) || 'javascript:;'
            });
        }
    } catch (e) {
        console.log(e);
    }
    return target;
};
