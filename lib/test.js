var nas=require('./index.js');
var fs=require('fs');

var keys=['AnchorR1','AnchorR1','AnchorR1'];
var aids=[2,3,4];
var configs=[{"height":"260","info":"[{\"img\":\"[{\\\"name\\\":\\\"11176896709546cefel.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315452_a6994b3128c81eb0_510x498.jpg\\\"}]\",\"link\":\"javascript:alert(1);\",\"note\":\"1号\"},{\"img\":\"[{\\\"name\\\":\\\"12921689733052.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315484_653d81de8977c992_450x600.jpg\\\"}]\",\"link\":\"\",\"note\":\"2号\"}]","bgColor":"{\"type\":\"rgba\",\"val\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0}}"}
,{"height":"340","info":"[{\"img\":\"[{\\\"name\\\":\\\"11176896709546cefel.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315452_a6994b3128c81eb0_510x498.jpg\\\"}]\",\"link\":\"javascript:alert(1);\",\"note\":\"1号\"},{\"img\":\"[{\\\"name\\\":\\\"12921689733052.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315484_653d81de8977c992_450x600.jpg\\\"}]\",\"link\":\"\",\"note\":\"2号\"}]","bgColor":"{\"type\":\"rgba\",\"val\":{\"r\":200,\"g\":100,\"b\":50,\"a\":1}}"}
,{"height":"150","info":"[{\"img\":\"[{\\\"name\\\":\\\"11176896709546cefel.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315452_a6994b3128c81eb0_510x498.jpg\\\"}]\",\"link\":\"javascript:alert(1);\",\"note\":\"1号\"},{\"img\":\"[{\\\"name\\\":\\\"12921689733052.jpg\\\",\\\"path\\\":\\\"http://h0.hucdn.com/images/201605/1454315484_653d81de8977c992_450x600.jpg\\\"}]\",\"link\":\"\",\"note\":\"2号\"}]","bgColor":"{\"type\":\"rgba\",\"val\":{\"r\":20,\"g\":0,\"b\":255,\"a\":0.5}}"}];


var html=nas.renderHTML(keys,configs,aids);
fs.writeFileSync('./demo.html',html,{encoding:'utf-8'});

var jsx=nas.renderJSX(keys,configs);
fs.writeFileSync('./jsx.js',jsx,{encoding:'utf-8'});