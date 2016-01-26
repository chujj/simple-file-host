#!/usr/bin/env node

//根据palcekey.js, create bundle文件, 上传文件到又拍云
var exec = require('child_process').exec,
    placekey = require('./placekey');

    var process = (function(){
        var procObj;
        function findKey(key){
            for(var pkey in placekey ){
                if(key === pkey){
                    procObj = placekey[key];
                }
            };

            createBundle(procObj[0], procObj[1], procObj[2])
        }

        function createBundle(entry, out, plat){
            // exec('react-native bundle —entry-file '+ entry +
            //     ' —bundle-output '+ out +' —root —platform '+ plat)
            var createProcess = exec('react-native bundle --entry-file '+ entry +
                 ' --bundle-output '+ out +' --root --platform '+ plat, function(err, stdout, stderr) {
              if (err) throw err;
              console.log(stdout);
            });

            createProcess.on('exit', function(){
                console.log('子进程已关闭');
                //创建完毕后上传
                uploadBundle();
            });
        }
        //http upload
        function uploadBundle(){

        }

        return {
            createBundle : createBundle,
            uploadBundle : uploadBundle,
            findKey : findKey
        }
    })();
//test for fun
process.findKey('index-top-ios');
module.exports = process;

