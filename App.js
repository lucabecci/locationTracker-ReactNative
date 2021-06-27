import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import Constants from 'expo-constants'

export default function App() {
  const [location, setLocation] = useState({})
  async function buscaLocation(){
    const {status} = await Location.requestBackgroundPermissionsAsync()
    if(status !== 'granted'){
      return Alert.alert("Please activate the ubication for the correct usage")
    }
    const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High})
    setLocation(location)
  }
  
  useEffect(() => {
    buscaLocation()
  }, [])


  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
      >{
        location.coords ? 
        <Marker coordinate={location.coords}
        title={"Your Location"}
        description="This is your location"
        />
        :
        null
      }</MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
