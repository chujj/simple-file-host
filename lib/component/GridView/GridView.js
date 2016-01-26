'use strict';

var React = require('react-native'),
    conf = require('./data');

var {
    Text,
    View,
    Image,
    Platform
} = React;


var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window'),
    phone = {"width":width,"height":height},
    retio = 750 / phone.width;


var GridView = React.createClass({
    getDefaultProps() {
        return conf;
    },
    _creatGrid() {
        var result = [],
        imgArr = conf.imgs;
        
        imgArr.map(function(v, index){
            result.push(
                <View style={styles.cell}>
                    <Image style={styles.girdImg} source={{uri : v}} resizeMode={'stretch'} />
                </View>
            )
        });
        
        return result;
                
    },
    render() {
        return (
            <View style={[styles.rowContainer, {paddingLeft: conf.marginSide/retio}]}>
                {this._creatGrid()}
            </View>
        );
    }
});

var styles = React.StyleSheet.create({
        rowContainer: {
            width: phone.width,
            height : conf.height/retio,
            flex:1,
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',

        borderWidth : 1,
        borderColor: '#000',
        },
        cell: {
            height: conf.perHeight/retio,
            width: conf.perWidth/retio,
            marginRight: conf.marginBetween/retio,
        },
        girdImg: {
            width: conf.perWidth/retio,
            height: conf.perHeight/retio,
                   

        },

})

module.exports = GridView;