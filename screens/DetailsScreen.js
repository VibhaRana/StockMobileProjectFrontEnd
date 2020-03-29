import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import FinnhubAPI from "../auth/Finnhub";
import Autocomplete from 'react-native-autocomplete-input';
import AuthAPIClass from '../auth/AuthAPIClass';

export default function DetailScreen({ navigation, route}) {
    const {title,data}=route.params
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
    const [message, setMessage] = useState("");
    const [countInput, setCountInput] = useState(0);

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

    async function callBuy() {
        let boughtData = await AuthAPIClass.buy(data)
        setMessage(boughtData.detail);
    };

    async function callSell() {
        let soldData = await AuthAPIClass.sell(data)
        setMessage(soldData.detail);
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
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setCountInput(text)}
                value={countInput}
            />
            <Button 
                title="Buy"
                onPress={callBuy}
            />
            <Button 
                title="Sell"
                onPress={callSell}
            />
            <Button 
                title="Watch"
                onPress={() => { console.log("Watch")}}
            />
            <Text>{message}</Text>
        </View>
    );
}