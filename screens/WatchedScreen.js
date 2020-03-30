import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, FlatList, Button, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
=======
import { View, Text, FlatList, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
>>>>>>> ea0fbd75a15b57a5c0db4286022ed697a4cef5c4
import AuthAPI from '../auth/AuthAPIClass';

export default function WatchedScreen({ navigation }) {
  const [watchlist, setWatchList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        let response = await AuthAPI.getWatchList();
        if (response.status == 200) {
          setWatchList(response.stocks);
        } else {
          console.log(response.detail);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const unsubscribe = navigation.addListener('focus', () => {
      _retrieveData();
    });
    return unsubscribe;
  }, [navigation]);

  const unWatch = async (symbol) => {
    try {
      let response = await AuthAPI.setWatch(symbol, false);
      if (response.status == 200) {
        setWatchList(watchlist.filter(stock => stock.symbol != symbol));
        setSelectedStock({});
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    watchlist.length > 0 ?
<<<<<<< HEAD
      <SafeAreaView>
=======
      <View>
>>>>>>> ea0fbd75a15b57a5c0db4286022ed697a4cef5c4
        <FlatList
          keyExtractor={item => item.symbol}
          data={watchlist}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('Detail', { data: item.symbol })}>
                <Text>{item.symbol}</Text>
                <Button title='Remove' color="red" onPress={() => { setModalVisible(true); setSelectedStock(item); }} />
              </TouchableOpacity>
            );
          }} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedStock({});
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Unwatch {selectedStock.symbol}?</Text>
              <View style={{ flexDirection: 'row' }}>
                <Button title="Confirm" color="red" onPress={() => { setModalVisible(false); unWatch(selectedStock.symbol) }} />
                <Button title="Cancel" color="grey" onPress={() => { setModalVisible(false); setSelectedStock({}); }} />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView> :
      <View>
        <Text>No watchlist</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});