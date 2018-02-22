import React ,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Constants, Audio, Font } from 'expo';
export default class Circle extends Component {
    
 render() {
     
     const { xTranslate, yTranslate, color } = this.props
     return (
         <View 
         style={[styles.container, {
            transform : [
                {translateX: xTranslate ? xTranslate : 10},
                {translateY: yTranslate ? yTranslate : 10},
            ],
            backgroundColor: color ? color : '#000'
        }]}>
         <View style={styles.innerCircle}>
         </View>
         </View>
     )
 }
}
const styles = StyleSheet.create({
    container: { 
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,    
        borderRadius: 40,
        borderColor: 'green',
        borderWidth: 7,
        
       
    },
    innerCircle: {
        backgroundColor: 'transparent',
        width: 80,
        height: 80,
        borderRadius: 35,
    },
})
