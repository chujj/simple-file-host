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
    Methods : {
    android: {
        toast: RNInterface.setDimension,
        getPhone: RNInterface.getPhone,
    },
    screen: {
        setHeight : RNInterface.setHeight,
    },
    navigator : {
        openPageWithAdsInfo : RNInterface.openPageWithAdsInfo,
    },
    phone : {
        rnVersion : '0.17.0',
        appVersion: '3.8.0',
    },
    rn : {
        reload: function () {}
    }
    },
    NativeUIComponents: {
    DemoCell: AN_ImageView,
    },
}

module.exports = { HBApp };
