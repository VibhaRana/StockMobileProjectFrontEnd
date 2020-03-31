import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import FinnhubAPI from "../auth/Finnhub"
import Autocomplete from 'react-native-autocomplete-input';
export default function SearchScreen({ navigation }) {
  const [query, setQuery] = React.useState("")
  const [stockData, setStocksData] = React.useState()
  const [candidateFilms, setCandidateFilms] = React.useState()
  React.useEffect(() => {
    const start = async () => {
      let candidate = await FinnhubAPI.getCandidate()
      setStocksData(candidate)
    }
    start()

  }, [])
  function findStock(userQuery) {
    if (userQuery === '') {
      return [];
    }
    const regex = new RegExp(`${userQuery.trim()}`, 'i');
    return stockData.filter(stockData => stockData.name.search(regex) >= 0).slice(0, 5);
  }
  function upDateCandidates(text) {
    setCandidateFilms(findStock(text))
  }
  return (
    <SafeAreaView style={styles.autocompleteContainer}>
      <Autocomplete
        keyExtractor={(item, index) => index.toString()}
        autoCapitalize="none"
        autoCorrect={false}
        defaultValue={""}
        data={candidateFilms}
        onChangeText={(text) => upDateCandidates(text)}
        renderItem={({ item, i }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
            <Text style={styles.itemText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      ></Autocomplete>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});