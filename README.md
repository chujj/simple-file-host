#Engine for NAS

NAS项目FED工程

###1. 环境搭建
####android
首先，下载安卓模拟器Genymotion，找jun.lu要相对应的APP
####ios
http://git.husor.com.cn/ios/mizhe 下载代码，切到feature/reactNative分支，npm install, pod install, xcode7.0以上。

###2.开发
请先设置placekey.js,这里配置坑位信息，component目录里面按规定写组件

###3.测试
####开发测试
npm start, 在app内输入192.168.XXX.XXX:8081,入口都是index.js无法更改。
####bundle测试
可以运行 ./bundle-test.sh 输入3个参数分别是entry-file， out， platform，需要有Python环境

在app内输入192.168.XXX.XXX:8000即可， 由于入口只有index.bundle, 所以脚本自动cp。

###4.上线
只需上传最后的bundle文件即可


##可调用的接口

可调用process.js里exports的方法来完成自动打包，掉用findKey可从placekey.js配置文件读key打包，也可直接调用createBundle方法传参打包（不建议使用）。