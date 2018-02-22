import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Button } from 'react-native';
import Modal from 'react-native-modal';
import React, {Component} from 'react';
//import { Constants, Audio } from 'expo';
import Circle from './Circle';
import Cross from './Cross';
import { centerPoints, areas, conditions } from '../constansts/gameco';
import { Constants, Audio, Font } from 'expo';

//If result === -1 game on, if result ===0 I won.
//result === 1 AI win, result === 2 tie
export default class GameBoard extends Component {
   
    constructor() {
        super()
        this.state = {
            userInputs: [],
            AIInputs: [],
            result: -1,
            round: 0,
            fontLoaded: false,
            visibleModal: false,
            text: '',

        }
    }
    
     //The methd that handles the sound - Expo audio
     //  onPress={this._handlePlaySoundAsync}
     _handlePlaySoundAsyncCircle = async () => {
        //console.log('sound runing');
         await Audio.setIsEnabledAsync(true);
         const soundCircle = new Expo.Audio.Sound();
         try {
            await soundCircle.loadAsync(require(`/Users/elivan/Desktop/game/game/src/assets/sounds/poka03.mp3`));
            //await soundCircle.setPositionAsync(0);
            await soundCircle.playAsync();
         } catch (err) {
            console.log('Error in sound line 39', err);
         }       
         
     };   
     //The methd that handles the sound - Expo audio
     //  onPress={this._handlePlaySoundAsync}
     _handlePlaySoundAsyncCross = async () => {
        //console.log('sound runing');
         await Audio.setIsEnabledAsync(true);
         const soundCircle = new Expo.Audio.Sound();
         try {
            await soundCircle.loadAsync(require(`/Users/elivan/Desktop/game/game/src/assets/sounds/poka02.mp3`));
            await soundCircle.playAsync();
         } catch (err) {
            console.log('Error in sound line 39', err);
         }
        
         
     };   

     //Load the font from our assets directory using Expo.Font.loadAsync()
     async componentWillMount() {
        await Font.loadAsync({
            'sayso-chic': require('/Users/elivan/Desktop/game/game/src/assets/fonts/sayso-chic.ttf')
        });
        this.setState({
            fontLoaded: true
        });

    }

    //The method to open the modal 
    openModal() {
        this.setState({visibleModal: true});
    }
    //The method to close the modal and restart the game.
    closeModal() {
        this.restart()
        this.setState({visibleModal: false});
    }

    componentDidMount() {
        this.restart()
        
    }
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
        <View style={styles.center}>
          <View style={styles.button}>
            <Text style={{color: 'white'}}>{text}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    
    //The method to restart the game.
    restart() {
        const {round } = this.state
        this.setState({
            userInputs: [],
            AIInputs: [],
            result: -1,
            round: round + 1
        })
        setTimeout(() => {
              this.AIMove()
        }, 5) 
      //console.log('Restart the game')
    }
    
    boardClickHandler(e) {
        const {locationX, locationY } = e.nativeEvent
        const {userInputs, AIInputs, result } = this.state
        if (result !== -1) {
            return
      }
        const inputs = userInputs.concat(AIInputs)
        
        const area = areas.find(d => 
            (locationX >= d.startX && locationX <= d.endX) &&
            (locationY >= d.startY && locationY <= d.endY))
            
            if (area && inputs.every(d => d !== area.id)) {
                //console.log('You pressed id:', area.id)
                this.setState({
                    userInputs: userInputs.concat(area.id)})
                setTimeout(() => {
                    this.judgeWinner()
                    this.AIMove()            
                }, 600)
            }
    }
        
    AIMove() {   
        setTimeout(() => {
            const {userInputs, AIInputs, result} = this.state
            if (result !== -1) {
              return
          }
          if (result == 0) {
            !this._handlePlaySoundAsyncCircle()
          } else {
            this._handlePlaySoundAsyncCircle()
          }
          while(true) {    
            const inputs = userInputs.concat(AIInputs)
            const randomNum = Number.parseInt(Math.random() * 9)
            //every - all elements in the array pass the test.
            if (inputs.every(d => d !== randomNum)) {
                //Make a move
                this.setState({
                    AIInputs: AIInputs.concat(randomNum)})
                    this.judgeWinner()
                    break
            }
            
        }         
        }, 600)
        
        
        
    }
    
    //Check fom the conditions 
    checkWinner(inputs) {
        /* NOTES: 
        The some method test whether at least one element in the array
        passed the test implementd by the provided function.
        The every method test wheter all elements in the array, pass the test.
        indexOf returns the first index at which a given element can be found
        in the array or -1 if it is not present.
        */
       return conditions.some(d => d.every(item => inputs.indexOf(item) !== -1 ))        
     }
     judgeWinner() {
        const {userInputs, AIInputs, result, text } = this.state
        const inputs = userInputs.concat(AIInputs)
        //When I win - the result is 0
        if (inputs.length >= 5 ) {
            let res = this.checkWinner(userInputs)
            if (res && result !== 0) {
                return this.setState({
                    result: 0,
                    visibleModal: true,
                    text: `There is still hope for humanity after all...
You Win!`
                })  
                     
            }   
                //When AI wins - the result is 1
                res = this.checkWinner(AIInputs)
                if (res && result !== 1) {
                    return  this.setState({
                        result: 1,
                        visibleModal: true,
                        text: `Roses are red, Violets are blue, winning is sweet and you are a twit! 
I Win!`
                    })
                    
                }               
            }   
        //When none wins - the result is 2.    
        if (inputs.length === 9 && result !== 2) {
            this.setState({
                result: 2,
                visibleModal: true,
                text: `Tie! Boring... 
Just give up and let 
ME Win!`
            })
        }
    }
    
    render() {       
        const urlImage = '/Users/elivan/Desktop/game/game/src/assets/images/geo2.gif'
        
        const {userInputs, AIInputs, result, text } = this.state
        console.log(result);
        return (
            <View>
                <ImageBackground 
                source={require(urlImage)}
                style={styles.container}>
                <TouchableOpacity              
                onPress={e => {
                this.boardClickHandler(e)
                this._handlePlaySoundAsyncCross()
                } }>
                <View style={styles.board}>
                <View style={styles.line}/>
                <View style={[styles.line, {
                    position: 'absolute',
                    width:3, 
                    height: 306, 
                    backgroundColor: 'black',
                    transform: [
                        {translateX: 200}
                    ]
                    }]}/>
                    <View style={[styles.line, {
                        position: 'absolute',
                        width:306, 
                        height: 3, 
                        backgroundColor: 'black',
                        transform: [
                            {translateY: 100}
                        ]
                        }]}/>
                        <View style={[styles.line, {
                            position: 'absolute',
                            width:306, 
                            height: 3, 
                            backgroundColor: 'black',
                            transform: [
                                {translateY: 200}
                            ]
                            }]}/>
                           {
                               userInputs.map((d, i) => (
                                   
                                   <Circle       
                                   key={i}
                                   xTranslate={centerPoints[d].x} 
                                   yTranslate={centerPoints[d].y}
                                   color = 'transparent'
                                   > 
                                   
                                   </Circle> 
                                                                                       
                                ))
                           }
                           {
                            AIInputs.map((d, i) => (
                                
                                <Cross 
                                key={i}
                                xTranslate={centerPoints[d].x} 
                                yTranslate={centerPoints[d].y}
                                color = 'black'
                                > 
                                
                                </Cross>                             
                            ))
                            }
                        </View>
                        </TouchableOpacity>                         
                     </ImageBackground>
                     <View style={styles.modalContainer}>
                     <Modal 
                     isVisible={this.state.visibleModal}
                        style={styles.bottomModal}>
                        <View style={styles.modalContent}>                    
                            <View>

                           { 
                            this.state.fontLoaded ? (   
                            <Text style=
                            {styles.textModal}>{text}</Text>
                            ) : null
                        }
                        {this._renderButton('Restart', () => this.closeModal())}
                        </View>
                        </View>
                     </Modal>
                    </View>
             </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        backgroundColor: 'white',
    },
    board:{
        width: 312,
        height: 312,
        borderWidth: 3,
        borderColor: 'white',

    },
    line: {    
         position: 'absolute',
         width:3, 
         height: 306, 
         backgroundColor: 'black',
         transform: [
             {translateX: 100}
            ]
       },
       center: {
        justifyContent: 'center',
        alignItems: 'center',
       },
       button: {
        backgroundColor: 'green',
        width: 120,
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'black',
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
  textModal: {
    fontFamily: 'sayso-chic', 
    color: 'green', 
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20  
  },
});