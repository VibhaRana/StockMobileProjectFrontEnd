import * as React from 'react';
import { AsyncStorage,  Button, Text, TextInput, View, StyleSheet, Image } from 'react-native';
import { AuthContext } from "../auth/authContext";

export default function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn, signUp } = React.useContext(AuthContext);
    
    return (
        <View style={styles.container}>
        <View >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIbod4_O0wTfM_v5eBPmNcTli5Ds-8qICGzUGoqlj73mZIh_uu' }} />
                <Text style={styles.title}>Check Your Stock Knowledge Here</Text>
            </View>

        </View>
        <View>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Sign in" onPress={() => signIn({ username, password })} />
            <Button title="Click here to register" onPress={() =>navigation.navigate("SignUp")} />
            
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#009688',
       
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        alignContent: 'center',
        padding: 40,
        width: 300,
        height: 300,
       
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: 'center'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        color: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 10
    },
   
});