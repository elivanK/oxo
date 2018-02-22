import React, {Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {Font } from 'expo';

export default class Header extends Component {
    constructor(props) {
        super(props)
        //Create the State
        this.state = {
            fontLoaded: false,           
        }
    }
     //Load the font from our assets directory using Expo.Font.loadAsync()
     async componentWillMount() {
        await Font.loadAsync({
            'sayso-chic': require('/Users/elivan/Desktop/game/game/src/assets/fonts/sayso-chic.ttf')
        });
        this.setState({
            fontLoaded: true
        });

    }
    
    render() {
        return (
            <View 
            style={styles.headerContainer}>
            {
                this.state.fontLoaded ? (
                <Text style={styles.header}>OXO</Text>
                )
                : null
            }
            </View>
        )
    }
    
    
    
}
    
const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30,
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    header: {
        color: 'green',
        fontSize: 25,
        fontFamily: 'sayso-chic',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        margin: 20,
    }
})
const {headerContainer, header} = styles;
