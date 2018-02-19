import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Popup extends Component {
    constructor(){
        super()
        this.state ={
            visibleModal: null,
        }
    }

    
    // Later change <Text> {this.gameResults(result)}</Text>
      _renderModalContent = () => (
        <View style={styles.modalContent}>
        
          <Text>Hello!</Text>
          {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>
      );
    
    gameResults() {
        switch(result) {
            case 0:
            return 'You won the game!'
            case 1:
            return 'AI won the game!'
            case 2:
            return 'No one won!'
            default:
            return 
        
        }
    }
    render() {
        //const {result, onRestart} = this.props
        return (
            <View style ={styles.container}>
            <View style={styles.bottomModal}>
            <TouchableOpacity>
          <View style={styles.button}>
            <Text>Hello</Text>
          </View>
        </TouchableOpacity>
            </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 12,
      margin: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });