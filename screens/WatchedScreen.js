import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, StyleSheet } from 'react-native';
import AuthAPI from '../auth/AuthAPIClass';

export default function WatchedScreen() {
  const [watchlist, setWatchList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});
  let update=0
  useEffect(() => {
    const _retrieveData = async () => {
      let response = await AuthAPI.getWatchList();
      if (response.status == 200) {
        setWatchList(response.stocks);
      } else {
        console.log(response.detail);
      }
    }
    _retrieveData();
    console.log("Here")
  }, [update]);

  const unWatch = async (symbol) => {
    console.log("removeing: "+symbol)
    let response = await AuthAPI.setWatch(symbol, false);
    if (response.status == 200) {
      console.log("success remove the list")
      let list=watchlist.filter(stock => stock.symbol != symbol)
      setWatchList([...list]);
      setSelectedStock({});
    }else{
      console.log("unsuccess remove the list")
      
    }
  }

  return (
    watchlist.length > 0 ?
      <View>
        <Button title="add" onPress={()=>{setWatchList([{symbol:"ABC"},{symbol:"ABCd"}])}}></Button>
        <Button title="add" onPress={()=>{setWatchList([{symbol:"ABC"}])}}></Button>
        <FlatList
          keyExtractor={item => item.symbol}
          data={watchlist}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.symbol}</Text>
                <Button title="Remove" color="red" onPress={() => { setModalVisible(true); setSelectedStock(item); }} />
              </View>
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
      </View> :
      <View>
        <Button title="add dummy" onPress={()=>{AuthAPI.setWatch("AAPL",true)}}></Button>
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