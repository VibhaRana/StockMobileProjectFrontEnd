
import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View, FlatList } from 'react-native';
//import {AuthContext} from "../App"
import { AuthContext } from "../auth/authContext"
import AuthAPI from "../auth/AuthAPIClass"
import authAPI from '../auth/authAPI';
export default function HomeScreen(props) {
    const { signOut } = React.useContext(AuthContext);
    const [token, setToken] = React.useState()
    const [Apidata,setData]=React.useState(["empty","empty2"])
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('userToken');
                if (value !== null) {
                    // We have data!!
                    setToken(value)
                }
            } catch (error) {
                // Error retrieving data
            }
        };
        _retrieveData()
        

    }, []);
    const _loadSucureData = async () => {
        var result = await AuthAPI.getTestData()
        console.log(result.data)
        if(result.data){
            setData(result.data)
        }
        
    }
  //  _loadSucureData()
    return (
        <View>
            <Text>Signed in! YO :{token}</Text>
            <FlatList data={Apidata} keyExtractor={i=>i} renderItem={({item})=>{return <Text>{item}</Text>}}/>
            <Button title="Sign out" onPress={signOut} />
            <Button title="get data" onPress={_loadSucureData} />
        </View>
    );
}