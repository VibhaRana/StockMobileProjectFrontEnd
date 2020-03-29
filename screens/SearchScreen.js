import React from 'react';
import { View, Text,Button } from 'react-native';
import FinnhubAPI from "../auth/Finnhub"
import Autocomplete from 'react-native-autocomplete-input';

export default function SearchScreen({navigation}) {
  return (
    <View>
      <Text>Search Screen</Text>
      <Button 
        onPress={()=>{
          navigation.navigate("Detail",{
            title: "yoho",
            data: "AAPL"
          })
        }} 
        title="Navigate to detail"
      />

    </View>
  );
}