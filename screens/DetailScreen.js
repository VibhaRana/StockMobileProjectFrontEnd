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
        const getQuoteData = async () => {
            const quote = await FinnhubAPI.getQuote(data);
            //const profile = await FinnhubAPI.getProfile(data);
            setPrice({
                open: quote.o,
                high: quote.h,
                low: quote.l,
                currentPrice: quote.c,
                previousClose: quote.pc
            });
            // setProfile({
            //     name: profile.name,
            //     marketCapitalization: profile.marketCapitalization,
            //     shareOutstanding: profile.shareOutstanding,
            //     description: profile.description
            // });
        };
        getQuoteData();
    }, []);
    async function callBuy(symbol, count, price) {
        let boughtData = await AuthAPIClass.buy(symbol, count, price)
        setResponse(boughtData);
        console.log('start callbuy test');
        console.log(boughtData.status);
        console.log(boughtData.detail);
        console.log(boughtData.currentCash);
        console.log(boughtData.totalPurchased);
        console.log('end callbuy test');
    };
    async function callSell(symbol, count, price) {
        let soldData = await AuthAPIClass.sell(symbol, count, price)
        setResponse(soldData);
        console.log('start callsell test');
        console.log(soldData.status);
        console.log(soldData.detail);
        console.log(soldData.currentCash);
        console.log(soldData.remaining);
        console.log('end callsell test');
    };
    
    return (
        <View>
            <Text>Symbol: {data}</Text>
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