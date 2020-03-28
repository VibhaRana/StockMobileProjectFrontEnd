import * as React from 'react';

import { AsyncStorage,  Button, Text, TextInput, View, StyleSheet, Image } from 'react-native';
import { AuthContext } from "../auth/authContext";
 


export default function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn, signUp } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image 
        style={styles.logo}
        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIbod4_O0wTfM_v5eBPmNcTli5Ds-8qICGzUGoqlj73mZIh_uu'}} />
        <Text style={styles.title}>Check Your Stock Knowledge Here</Text>
        </View>
        
        </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009688',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'

    },
    logo: {
        width: 100,
        height: 100

    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: 'center'
    }
})















            
