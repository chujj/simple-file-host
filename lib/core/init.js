var fs=require('fs');
var previewStr=fs.readFileSync('preview.hbs',{encoding:'utf-8'});
var jsxStr=fs.readFileSync('jsx.hbs',{encoding:'utf-8'});
var templates={
    preview:previewStr,
    jsx:jsxStr
};
fs.writeFileSync('templates.json',JSON.stringify(templates),{encoding:'utf-8'});
