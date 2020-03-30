import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, TextInput, SafeAreaView } from 'react-native';
import FinnhubAPI from "../auth/Finnhub";
import AuthAPIClass from '../auth/AuthAPIClass';
import NumberFormat from 'react-number-format';

export default function DetailScreen({ route }) {
    const { data } = route.params
    const [countInput, setCountInput] = useState("");
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
                marketCapitalization: (tempProfile.marketCapitalization * 1000000),
                shareOutstanding: (tempProfile.shareOutstanding * 1000000),
                description: tempProfile.description
            });
        };
        getData();
    }, []);
    async function callBuy(symbol, count, price) {
        let boughtData = await AuthAPIClass.buy(symbol, count, price)
        setResponse(boughtData);
    };
    async function callSell(symbol, count, price) {
        let soldData = await AuthAPIClass.sell(symbol, count, price)
        setResponse(soldData);
    };
    async function callAddToWatch(symbol) {
        await AuthAPIClass.setWatch(symbol, true);
        setResponse({
            detail: "Added to watchlist"
        })
    }
    return (
        <SafeAreaView>
        <ScrollView>
            <Text>Name: {profile.name}</Text>
            <Text>Symbol: {data}</Text>
            <Text>
                Market Capitalization:{' '}
                <NumberFormat 
                    value={profile.marketCapitalization} 
                    displayType={'text'} 
                    thousandSeparator={true}
                    renderText={value => <Text>{value}</Text>}
                />
            </Text>
            <Text>
                Shares Outstanding:{' '}
                <NumberFormat 
                    value={profile.shareOutstanding} 
                    displayType={'text'} 
                    thousandSeparator={true}
                    renderText={value => <Text>{value}</Text>}
                />
            </Text>
            <Text>{profile.description}</Text>
            <Text>Current Price: ${price.currentPrice}</Text>
            <Text>Open Price: ${price.open}</Text>
            <Text>High Price: ${price.high}</Text>
            <Text>Low Price: ${price.low}</Text>
            <Text>Previous Close Price: ${price.previousClose}</Text>
            <TextInput 
                placeholder = {"Enter quantity here"}
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
                onPress={() => callAddToWatch(data)}
            />
            <Text>{(response.detail != "") ? response.detail : "" }</Text>
            <Text>
                {(response.remaining != "" && response.remaining != null) ? "You have " + response.remaining + " stocks remaining." : (response.totalPurchased != "" && response.totalPurchased != null) ? "You currently have " + response.totalPurchased + " stocks purchased." : "" }
            </Text>
            <Text>
                {(response.currentCash != "" && response.currentCash != null) ? "Your current cash amount is: $" + response.currentCash : "" }
                </Text>
        </ScrollView>
        </SafeAreaView>
    );
}