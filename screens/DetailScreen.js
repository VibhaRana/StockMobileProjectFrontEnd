import React from 'react';
import { View, Text,Button } from 'react-native';
import FinnhubAPI from "../auth/Finnhub"
import Autocomplete from 'react-native-autocomplete-input';
export default function SearchScreen({ navigation, route}) {
    const {symbol,name}=route.params
  return (
    <View>
      <Text>detail Screen</Text>
      <Text>{symbol}</Text>
      <Text>{name}</Text>
      <Button onPress={()=>{FinnhubAPI.getQuote("AAPL")}} title="search"></Button>
     
    </View>
  );
}