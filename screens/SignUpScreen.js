import * as React from 'react';
import { AsyncStorage, TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import {AuthContext} from "../auth/authContext"

export default function SignUpScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [comfirmPassword, setComfirmPassword] = React.useState('');
    const { signIn, signUp } = React.useContext(AuthContext);
  
    return (
      
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
        style={styles.input}
        underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
        style={styles.input}
        underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Comfirm Password"
          value={comfirmPassword}
          onChangeText={setComfirmPassword}
          secureTextEntry
        />
       
         <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>
      </View>
    );
  }
   const styles = StyleSheet.create({
     container: {
       backgroundColor: '#009688',
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
     },
     input:{
       width: 300,
       backgroundColor: 'rgba(255, 255, 255, 0.3)',
       borderRadius: 25,
       paddingHorizontal: 19,
       paddingVertical: 12,
       marginVertical: 10
     },
     button: {
       width:300,
       backgroundColor: '#fc5c65',
       borderRadius: 25,
       marginVertical: 10,
       paddingVertical: 12
     },
     buttonText: {
       fontSize: 16,
       fontWeight: '500',
       color: '#ffffff',
       marginVertical: 10,
       textAlign: 'center'
     },
     



   })