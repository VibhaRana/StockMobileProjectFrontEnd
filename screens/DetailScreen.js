import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, TextInput, StyleSheet, View, SafeAreaView } from 'react-native';

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

        <View style={styles.container}>

        <ScrollView>
            <Text style={styles.heading}>Name: {profile.name}</Text>
            <Text style={styles.symbol}>Symbol: {data}</Text>
            <Text style={styles.text}>
                Market Capitalization:{' '}
                <NumberFormat 
                    value={profile.marketCapitalization} 
                    displayType={'text'} 
                    thousandSeparator={true}
                    renderText={value => <Text>{value}</Text>}
                />
            </Text>
            <Text style={styles.text}>
                Shares Outstanding:{' '}
                <NumberFormat 
                    value={profile.shareOutstanding} 
                    displayType={'text'} 
                    thousandSeparator={true}
                    renderText={value => <Text>{value}</Text>}
                />
            </Text>
            <Text style={styles.text}>{profile.description}</Text>
            <Text style={styles.text}>Current Price: ${price.currentPrice}</Text>
            <Text style={styles.text}>Open Price: ${price.open}</Text>
            <Text style={styles.text}>High Price: ${price.high}</Text>
            <Text style={styles.text}>Low Price: ${price.low}</Text>
            <Text style={styles.text}>Previous Close Price: ${price.previousClose}</Text>

   
            <TextInput
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder = {"Enter quantity here"}
                onChangeText = {(text)=> setCountInput(text)}
                value = {countInput}
                keyboardType = {'numeric'}
            />
            <Button style={styles.button}
                title="Buy"
                onPress={() => callBuy(data, countInput, price.currentPrice)}
                
            />
            <Button style={styles.button}
                title="Sell"
                onPress={() => callSell(data, countInput, price.currentPrice)}
            />
            <Button style={styles.button}
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

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#009688',
        flex: 1,
        alignItems: 'center',
        textAlign: 'left',
        padding: 20
        
      
      },
    
    button: {
      width:200,
      backgroundColor: '#fc5c65',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      shadowColor: 'black',
      alignContent: "space-around"
    },
    input:{
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        paddingHorizontal: 19,
        paddingVertical: 12,
        marginVertical: 10,
        
      },
      heading : {
          fontWeight: 'bold',
          fontSize: 18,
          color: 'white'
      },
      symbol: {
       fontWeight : 'bold',
       fontSize: 16,
       color: 'white'

      }, text : {
          color:'white',
          lineHeight: 20
      }

})
