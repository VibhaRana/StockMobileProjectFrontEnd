import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AuthAPI from '../auth/AuthAPIClass';

export default function WatchedScreen() {
  const [watchlist, setWatchList] = useState([]);

  useEffect(() => {
    const _retrieveData = async () => {
        let response = await AuthAPI.WatchList();
        if (response.status == 200) {
          setWatchList(response.stocks);
        } else {
          console.log(response.detail);
        }    
    }
    _retrieveData();
  }, []);

  return (
    watchlist.length > 0 ?
      <View>
        <Text>Watched Screen</Text>
        <FlatList
          keyExtractor={item => item.symbol}
          data={watchlist}
          renderItem={({ item }) => {
            return <Text>{item.symbol}</Text>
          }} />
      </View> :
      <View>
        <Text>No watchlist</Text>
      </View>
  );
}