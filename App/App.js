import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    further_info:false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned, further_info } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (      
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        { further_info && (<TouchableOpacity activeOpacity = { .5 }>
        
        <Image
          style={{height:720, width:360, top:40, left: 20}}
          source={require('../App/assets/detailed-screen.png')}
        />
        </TouchableOpacity>)
        }
        { !further_info && (<View style={{height: 80, justifyContent: 'flex-end'}}>
          <Text style={{ left: 20, fontSize: 28 }}>THE ETHICAL SCAN</Text>
        </View>)}
        { !further_info && (<BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={styles.wrapper} />)}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true }); 
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        let stars_rating = 3;
        let stars_rating_string = "";
        for (i = 1; i <= 5; i++)
          if (i <= stars_rating)
            stars_rating_string +=  "★";
          else
            stars_rating_string +=  "☆";
        Alert.alert(
          'Product Rating',
          stars_rating_string + '\n\nThis shirt from H&M is ethically compromised. Consider buying your clothes from a more sustainable producer.',
          [
            {text: 'Detailed Infomations', onPress: () => {console.log('Ask me later pressed');this.setState({further_info: true})}},
            {text: 'OK', onPress: () => {console.log('OK Pressed ' + data ); this.setState({scanned: false}); }},
          ],
          {cancelable: false},
        );
        console.log("Data: "+ data);
      }); 
    
  };
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    top: 80,
    bottom: 60  ,
    backgroundColor: 'transparent',
  },
});
