import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

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
        <View style={{height: 80, justifyContent: 'flex-end'}}>
          <Text style={{textAlign: 'center', fontSize: 28 }}>THE ETHICAL SCAN</Text>
        </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={styles.wrapper}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true }); 
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        //alert(`Barcode scanned: Your Sweather has a rating of 3!` + json.title); // DATA IS THE VALUE
        Alert.alert(
          'Product Rating',
          'The product you\'ve scanned received a rating of three stars',
          [
            {text: 'Retrieve further Infomations', onPress: () => console.log('Ask me later pressed')},
            {text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({scanned: false}); }},
          ],
          {cancelable: false},
        );
      }); 
    
  };
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    top: 80,
    backgroundColor: 'transparent',
  },
});
