import React from 'react';

import { AsyncStorage, View, Text, Button,FlatList,TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import { AuthContext } from "../auth/authContext";
import AuthAPI from "../auth/AuthAPIClass";
import FinnhubAPI from "../auth/Finnhub"
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
export default function PortfolioScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [label, setLabel] = React.useState();
  const [data, setData] = React.useState([0]);
  const [purchased, setPurchased] = React.useState([])
  const [hasPerformance, SetHasPerformance] = React.useState(false)
  const [cash, setCash] = React.useState(0)
  const [stockPerformance, setStockPerformance] = React.useState()
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const _retrieveData = async () => {
      let result = await AuthAPI.getPerformance()
      console.log("Result")

        
        
      if(result.data&&result.data.startDate&&result.data.performance){


      console.log(result.performance)



        let tempLabel = []
        let tempData = result.data.performance.split(",").map(x => +x)
        setCash(result.data.cash)
        console.log("Cash: =================" + result.data.cash)
        let startDate = new Date(result.data.startDate)
        console.log(result.data.startDate)
        console.log(startDate.toLocaleDateString())
        console.log(startDate.getTime())
        console.log(tempData)
        for (let i = 0; i < tempData.length; i++) {
          let tempDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
          tempLabel.push(tempDate.toLocaleDateString())
        }
        console.log(tempLabel)
        SetHasPerformance(true)
        let result2 = await AuthAPI.getPurchases()
        console.log(result2)
        if (result2 && result2.status == 200) {
          console.log("update purchased")
          setPurchased(result2.stocks)
          console.log(result2.stocks)
        }
        let tempStockPerformance = 0
        // purchased.forEach(e=>{ 
        //   let price=await AuthAPI.getQuote(e.symbol)
        //   console.log(`current price: ${price.c} count:${}`)
        //   stockPerformance+=price.c*e.count
        // })
        for (let i = 0; i < result2.stocks.length; i++) {
          let e = result2.stocks[i]
          let price = await FinnhubAPI.getQuote(e.symbol)
          console.log(`current price: ${price.c} count:${e.count}`)
          tempStockPerformance += price.c * e.count
        }
        setStockPerformance(tempStockPerformance)
        console.log(tempStockPerformance)

        setLabel(tempLabel)
        setData(tempData)
        console.log(data);
      }


    };
    const unsubscribe = navigation.addListener('focus', () => {
      _retrieveData();
    });
    return unsubscribe;
  }, [navigation]);

  return (


         <View style={styles.container}>
     
      {hasPerformance?
      <LineChart
        data={{
          labels:label,
          datasets: [
            {
              data:data
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#1e88e5",
          backgroundGradientFrom: "#1e88e5",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#0d47a1"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 0
        }}
      
      />:<Text>not enough data for graph</Text>}
     
     <Text style={styles.text}>Total Cash:{cash}</Text>
     <Text style={styles.text} >Total Stock Current Value:{stockPerformance}</Text>
     <Text style={styles.text}>Total Portfolio Value:{cash+stockPerformance}</Text>
    <Button style={styles.button} title="Sign out" onPress={signOut} />
   
  
     

    
    
     <FlatList
          keyExtractor={item => item.symbol}
          data={purchased}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity  style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() =>navigation.navigate("Detail",{data:item.symbol}) }>
                <Text style={styles.textContentOne}>Symbol: {item.symbol}</Text>
                <Text style={styles.textContentTwo}>Count: {item.count}</Text>
                </TouchableOpacity>



                
              </View>
            );
          }} />
    </View>


  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009688',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  
  },
  button: {
    width:300,
    backgroundColor: '#fc5c65',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    shadowColor: 'black',
    alignContent: "space-around"
  },
  text : {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
  },
  textContentOne:{
    padding: 30,
    marginLeft: 0,
    marginBottom: 0,
     
     fontWeight: 'bold',
     fontSize: 20,
     color: 'white',
     
  },
  textContentTwo:{
    padding: 30,
    marginRight: 0,
    marginBottom: 0,
    
     fontWeight: 'bold',
     fontSize: 20,
     color: 'white',
    
  }
   
    
    
  
})
