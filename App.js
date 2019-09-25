import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SpotifyFavoriteExample from './SpotifyFavoriteExample'; 

export default function App() {
  return (
    <View style={styles.container}>
      <SpotifyFavoriteExample/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
});
