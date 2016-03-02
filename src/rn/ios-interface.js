'use strict';

var React = require('react-native')
var {
    NativeModules,
    requireNativeComponent,
} = React;


//////////////////////////////// native method ////////////////////////////////
var HBNavigator = NativeModules.HBNavigator;
var HBAppNative = NativeModules.HBApp;


//////////////////////////////// native ui ////////////////////////////////





//////////////////////////////// export ////////////////////////////////

var HBApp = {
    Properties : {
        phone : {
            rnVersion : HBAppNative.rnVersion,
            appVersion : HBAppNative.appVersion,
        },
    },

    Methods : {
        screen: {
            setHeight : function () {},//兼容android
        },
        navigator : {
            openAdsPageWithUrl : HBNavigator.rn_openAdsPageWithUrl,
        },
        analysis: {
            husorEvent : HBAppNative.husorEvent, // key, map
            umengEvent : HBAppNative.umengEvent, // key, value(or NULL)
        }
    },
    NativeUIComponents: {
        
    },
}

module.exports = { HBApp };