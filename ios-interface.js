'use strict';

var React = require('react-native')
var {
    NativeModules,
    requireNativeComponent,
} = React;


//////////////////////////////// native method ////////////////////////////////
var HBNavigator = NativeModules.HBNavigator;



//////////////////////////////// native ui ////////////////////////////////
// var XLGCell = {
//   name: 'XLGCell',
//   propTypes: {
//       rowData: React.PropTypes.object,
//       animateXX: React.PropTypes.func
//   },
// };
// XLGCell.propTypes = {
//   rowData: React.PropTypes.object,
//   animateXX: React.PropTypes.func

// };

// const HBXLGCell = require('./XLGCell_native');




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
