import React, { useState, useEffect } from 'react';
import { View, Text,Button } from 'react-native';
import FinnhubAPI from "../auth/Finnhub"
import Autocomplete from 'react-native-autocomplete-input';
export default function SearchScreen({ navigation, route}) {
    const {data}=route.params
    
    const [currentPrice, setCurrentPrice] = useState("");
    useEffect( () => {
      const start=async()=>{
        let temp = await FinnhubAPI.getQuote(data);
        setCurrentPrice(temp.c);
      }
      start()
     
    },[])
  return (
    <View>
      <Text>detail Screen</Text>
      <Text>current price :{currentPrice}</Text>
      <Text>{data}</Text>
     
     
    </View>
  );
}