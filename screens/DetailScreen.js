import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import FinnhubAPI from "../auth/Finnhub";
import Autocomplete from 'react-native-autocomplete-input';
import AuthAPIClass from '../auth/AuthAPIClass';

export default function DetailScreen({ navigation, route}) {
    const { data } = route.params
    const [countInput, setCountInput] = useState(0);
    const [price, setPrice] = useState({
        open: "",
        high: "",
        low: "",
        currentPrice: "",
        previousClose: ""
    });
    const [profile, setProfile] = useState({
        name: "",
        marketCapitalization: "",
        shareOutstanding: "",
        description: ""
    });
    const [response, setResponse] = useState({
      detail: "",
      currentCash: "",
      remaining: 0,
      totalPurchased: 0
    });
    useEffect(() => {
        const getData = async () => {
            const tempQuote = await FinnhubAPI.getQuote(data);
            const tempProfile = await FinnhubAPI.getProfile(data);
            setPrice({
                open: tempQuote.o,
                high: tempQuote.h,
                low: tempQuote.l,
                currentPrice: tempQuote.c,
                previousClose: tempQuote.pc
            });
            setProfile({
                name: tempProfile.name,
                marketCapitalization: tempProfile.marketCapitalization,
                shareOutstanding: tempProfile.shareOutstanding,
                description: tempProfile.description
            });
        };
        getData();
    }, []);
    async function callBuy(symbol, count, price) {
        let boughtData = await AuthAPIClass.buy(symbol, count, price)
        setResponse(boughtData);
        console.log(profile);
    };
    async function callSell(symbol, count, price) {
        let soldData = await AuthAPIClass.sell(symbol, count, price)
        setResponse(soldData);
    };
    
    return (
        <View>
            <Text>Name: {profile.name}</Text>
            <Text>Symbol: {data}</Text>
            <Text>Market Capitalization: {profile.marketCapitalization}</Text>
            <Text>Shares Outstanding: {profile.shareOutstanding}</Text>
            <Text>{profile.description}</Text>  
            <Text>Current Price: ${price.currentPrice}</Text>
            <Text>Open Price: ${price.open}</Text>
            <Text>High Price: ${price.high}</Text>
            <Text>Low Price: ${price.low}</Text>
            <Text>Previous Close Price: ${price.previousClose}</Text>
            <TextInput 
              onChangeText = {(text)=> setCountInput(text)}
              value = {countInput}
              keyboardType = {'numeric'}
            />
            <Button 
                title="Buy"
                onPress={() => callBuy(data, countInput, price.currentPrice)}
            />
            <Button 
                title="Sell"
                onPress={() => callSell(data, countInput, price.currentPrice)}
            />
            <Button 
                title="Watch"
                onPress={() => { console.log("Watch")}}
            />
            <Text>{(response.detail != "") ? response.detail : "" }</Text>
            <Text>{(response.remaining != "" && response.remaining != null) ? "You have " + response.remaining + " stocks remaining." : "" }</Text>
            <Text>{(response.totalPurchased != "" && response.totalPurchased != null) ? "You currently have " + response.totalPurchased + " stocks purchased." : "" }</Text>
            <Text>{(response.currentCash != "" && response.currentCash != null) ? "Your current cash amount is: $" + response.currentCash : "" }</Text>
        </View>
    );
}