import * as React from 'react';

// import { withNavigation } from 'react-navigation';
import { AsyncStorage, Button, Text, StyleSheet, TextInput, View, SafeAreaView } from 'react-native';
export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={styles.title}>Best Brokers</Text>
      </View>
      <Text style={styles.subtitle}>Learn about stock market</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#009688',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  title: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'white',
    fontWeight: '200'
  }


});