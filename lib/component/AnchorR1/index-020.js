'use strict';

var React = require('react-native');
var {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Platform,
    Dimensions
    } = React;

var { width, height } = Dimensions.get('window'),
    phone = {"width":width,"height":height},
    needInterruptGesture,
    isIOS = Platform.OS == 'ios' ? true : false,
    retio = global.retio;

var AnchorR1 = React.createClass({
_creatGridIOS(){
    var result = [],
        self = this,
        conf = this.props.conf;
    var imgArr = conf.anchors;
    imgArr.map(function(v, index){
        var nativeSchema = v.link,
            record = v.code;

        result.push(
            <View style={[styles.cell]} onStartShouldSetResponder={self._onStartShouldSetResponder} onResponderMove={self._onResponderMove} onResponderRelease={self._onResponderRelease(nativeSchema, record)} >
                <Image style={{width:Number(v.width)/retio , height: Number(v.height)/retio}} source={{uri : v.img}} resizeMode={'stretch'} />
            </View>
        );
    });
    return result;
},
_creatGridAndroid(){
    var result = [],
        self = this,
        conf = this.props.conf;
    var imgArr = conf.anchors;
    imgArr.map(function(v, index){
        var nativeSchema = v.link,
            record = v.code;

        result.push(
            <TouchableWithoutFeedback style={[styles.cell]} onPress={self._onPress(nativeSchema, record)} >
                <Image style={{width:Number(v.width)/retio , height: Number(v.height)/retio}} source={{uri : v.img}} resizeMode={'stretch'} />
            </TouchableWithoutFeedback>
        );
    });
    return result;
},
_onPress(schema, record){
    var method = global.HBApp.Methods;
    return ((evt)=>{
        method.navigator.openAdsPageWithUrl(schema);
        method.analysis.husorEvent(record, {});
        method.analysis.umengEvent(record,null);
    });
},
_onStartShouldSetResponder(evt){
    needInterruptGesture = false;
    return true;
},
_onResponderMove(evt) {
    needInterruptGesture = true;
},
_onResponderRelease(schema, record) {
    var method = global.HBApp.Methods;

    return ((evt)=>{
        if(needInterruptGesture == false){
            method.navigator.openAdsPageWithUrl(schema);
            method.analysis.husorEvent(record, {});
            method.analysis.umengEvent(record,null);
        }
    });
},


render(){
    var conf = this.props.conf;
    var ret = isIOS ? this._creatGridIOS() : this._creatGridAndroid();
    return(
        <View style={[styles.rowContainer, {backgroundColor:conf.bgColor,paddingTop:Number(conf.paddingTop)/retio,paddingBottom: Number(conf.paddingBottom)/retio}]}>
            {ret}
        </View>
        );
}
});

var styles = React.StyleSheet.create({
    rowContainer: {
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: phone.width
    },
    cell: {
    }
});

module.exports = AnchorR1;