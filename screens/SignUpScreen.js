import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import {AuthContext} from "../auth/authContext"

export default function SignUpScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [comfirmPassword, setComfirmPassword] = React.useState('');
    const { signIn, signUp } = React.useContext(AuthContext);
  
    return (
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Comfirm Password"
          value={comfirmPassword}
          onChangeText={setComfirmPassword}
          secureTextEntry
        />
       
        <Button title="Sign up" onPress={() => signUp({ username, password,comfirmPassword })} />
      </View>
    );
  }