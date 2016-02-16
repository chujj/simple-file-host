'use strict';

var React = require('react-native');
var {
    Text,
    View,
    Image,
    Platform
    } = React;
    
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window'),
    phone = {"width":width,"height":height},
    retio = global.retio;

var AnchorR1 = React.createClass({
    _creatGrid(){
    var result = [],
        conf = this.props.conf;
    var imgArr = conf.anchors;
    imgArr.map(function(v, index){
        var nativeSchema = v.link;
        result.push(
            <TouchableWithoutFeedback style={[styles.cell]} onPress={() => global.HBApp.Methods.navigator.openAdsPageWithUrl(nativeSchema)} >
                <Image style={{width:Number(v.width)/retio , height: Number(v.height)/retio}} source={{uri : v.img}} resizeMode={'stretch'} />
            </TouchableWithoutFeedback>
        );
    });
    return result;
},
render(){
    var conf = this.props.conf;
    return(
        <View style={[styles.rowContainer, {backgroundColor:conf.bgColor,paddingTop:Number(conf.paddingTop)/retio,paddingBottom: Number(conf.paddingBottom)/retio}]}>
            {this._creatGrid()}
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