/**
 html相关的工具类
 **/
var _=require('underscore');
_.str=require('underscore.string');
_.mixin(_.str.exports());
var BASE_REM = 750 / 16;//基础rem

var rgba_compiled =_.template('rgba(<%=r%>,<%=g%>,<%=b%>,<%=a%>)');

/**
 * px转rem
 * @param px
 * @returns {number}
 */
exports.pxToRem = function (px) {
    var val = 0;
    try {
        val = parseFloat(px) / BASE_REM;
    } catch (e) {
    }
    return val;
};

/**
 * 返回颜色字符串
 * @param o
 * @returns {*}
 */
exports.colorStr = function(o){
    typeof o ===  'string' && (o=JSON.parse(o));
    switch(o.type){
        case 'rgba':
            return rgba_compiled(o.val);
    }
};