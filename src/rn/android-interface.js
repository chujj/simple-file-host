'use strict';

var React = require('react-native')

//////////////////////////////// native method ////////////////////////////////

var RNInterface = React.NativeModules.RNInterface;

//////////////////////////////// native ui ////////////////////////////////
var { 
    requireNativeComponent, 
    PropTypes 
} = React;

var theView = {
  name: 'ImageView',
  propTypes: {
    data: PropTypes.object,
  },
};

// https://github.com/facebook/react-native/issues/3685
var AN_ImageView = requireNativeComponent('RCTAdView', theView, {nativeOnly: {
    'onLayout': true,
    'scaleX': true,
    'scaleY': true,
    'testID': true,
    'decomposedMatrix': true,
    'backgroundColor': true,
    'accessibilityComponentType': true,
    'renderToHardwareTextureAndroid': true,
    'translateY': true,
    'translateX': true,
    'accessibilityLabel': true,
    'accessibilityLiveRegion': true,
    'importantForAccessibility': true,
    'rotation': true,
    'opacity': true,
}});


//////////////////////////////// export ////////////////////////////////

var HBApp = {
    Properties : {
    phone : {
        rnVersion : RNInterface.rnVersion,
        appVersion : RNInterface.appVersion,
    },
    },
    Methods : {
    android: {
        toast: RNInterface.setDimension,
        getPhone: RNInterface.getPhone,
    },
    screen: {
        setHeight : RNInterface.setHeight,
    },
    navigator : {
        openAdsPageWithUrl: RNInterface.openPageWithUrl,
    },
    rn : {
        reload: function () {}
    },
    analysis: {
        // key_string, value_map
        husorEvent : function(key, valuemap) {
        RNInterface.husorEvent(key, JSON.stringify(valuemap))
        },
        // key_string, value_string(or NULL)
        umengEvent : RNInterface.umengEvent,
    },
    },
    NativeUIComponents: {
    DemoCell: AN_ImageView,
    },
}

module.exports = { HBApp };
