import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';

//import Store from './src/Store';


import Game from './src/components/Game';

export default class App extends Component {
  render() {
    return (
      <Game/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blue: {
    backgroundColor: 'blue',
    height: 100,
    width: 100,
    borderRadius: 100/2,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
