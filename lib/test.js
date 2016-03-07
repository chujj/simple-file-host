var nas=require('./index.js');
var fs=require('fs');

var keys=[];
var aids=[];
var configs=[];
var k1='AnchorR1';
var c1={"height":"260","info":"","bgColor":"{\"type\":\"rgba\",\"val\":{\"r\":66,\"g\":42,\"b\":42,\"a\":1}}"};//默认什么都没传
var c2={"height":"","info":"","bgColor":"{\"type\":\"rgba\",\"val\":{\"r\":66,\"g\":42,\"b\":42,\"a\":1}}"};//没填高度
var c3={"height":"260","info":"[{\"img\":\"[]\",\"link\":\"http://www.baidu.com\"}]","bgColor":"{\"type\":\"rgba\",\"val\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0}}"};//没传布点图片
var c4={"height":"260","info":"[{\"img\":\"[{\\\"name\\\":\\\"11176896709546cefel.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315452_a6994b3128c81eb0_510x498.jpg\\\"}]\",\"link\":\"javascript:alert(1);\",\"note\":\"1号\"},{\"img\":\"[{\\\"name\\\":\\\"12921689733052.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315484_653d81de8977c992_450x600.jpg\\\"}]\",\"link\":\"\",\"note\":\"2号\"}]","bgColor":"{\"type\":\"rgba\",\"val\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0}}"};//正常
keys.push(k1);
configs.push(c4);
aids.push(2);
var val=nas.renderJSX(keys,configs);
console.log(val.success+':'+val.message);
//fs.writeFileSync('./demo.html',html,{encoding:'utf-8'});

//var jsx=nas.renderJSX(keys,configs);
//fs.writeFileSync('./jsx.js',jsx,{encoding:'utf-8'});