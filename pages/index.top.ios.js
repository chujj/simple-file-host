'use strict';

var React = require('react-native'),
    GridView = require('../lib/component/GridView/GridView');

var {
    Text,
    View,
    Image,
    Platform
} = React;

var {
    HBApp ,
} = (Platform.OS == 'ios') ? require('../ios-interface.js') : require('../android-interface.js');



const IndexTopIOS = React.createClass({
    render() {
        return (
            <View>
                <Text>react-native-start</Text>
                <Text>react-native-test-component</Text>
                <GridView></GridView>
                <Text>react-native-test-component-end</Text>
            </View>
        );
    }
});




var styles = React.StyleSheet.create({
    
});

HBApp.Methods.screen.setHeight(1200);

React.AppRegistry.registerComponent('HBApp', () => IndexTopIOS);