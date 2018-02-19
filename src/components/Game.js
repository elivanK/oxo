import {Provider} from 'react-redux';
import React, {Component} from 'react';
//import assest from '/Users/elivan/Desktop/game/game/src/assets/ttt_play2.gif';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
//import Store from './src/Store';
import Header from './Header';
import Color from './Color';
import GameBoard from './GameBoard';
import {Font } from 'expo';

export default class Game extends Component {
    constructor(props) {
        super(props)
        //Create the State
        this.state= {
            gameStarted: false,
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
    

    startGame() {
        this.setState({
            gameStarted : true
        })
    }
    render() {
        //To use the game started inside the app
        const {gameStarted} = this.state
        return (
          <View style={styles.container}>
          <Header/>
          {
              !gameStarted ? (
            <GameBoard />
              ) : (
                  <View>   
                  <TouchableOpacity onPress={() => this.startGame()}>
                  {
                    this.state.fontLoaded ? (
                        <Text style={styles.start}>Click here to start HCI
                        </Text>     
                    ) : null 
                    }
                  
                  </TouchableOpacity>
                  <Image source={require('/Users/elivan/Desktop/game/game/src/assets/images/giphy.gif')} style={styles.image} />
                  </View>
              )
          }
         
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
        
      },    
     start: {
     textAlign: 'center',
     color: 'green',
     marginBottom: 5, 
     marginTop: 70,   
     fontFamily: 'sayso-chic',
     fontSize: 17,
      },
      image: {
        height: 400,
        width: 400,
        marginTop: 50,
      },
    });