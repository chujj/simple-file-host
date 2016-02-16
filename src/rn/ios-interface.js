'use strict';

var React = require('react-native')
var {
    NativeModules,
    requireNativeComponent,
} = React;


//////////////////////////////// native method ////////////////////////////////
var HBNavigator = NativeModules.HBNavigator;


//////////////////////////////// export ////////////////////////////////

var HBApp = {
    Methods : {
        screen: {
            setHeight : function () {},//兼容android
        },
        navigator : {
            openPageWithAdsInfo : HBNavigator.openPageWithAdsInfo,
        },
        phone : {
            rnVersion : '0.17.0',
            appVersion: '3.8.0',
        },
        rn : {
            reload: function () {}
        }
    }
}

module.exports = { HBApp };
