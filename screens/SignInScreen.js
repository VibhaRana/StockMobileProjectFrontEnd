import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { AuthContext } from "../auth/authContext"

export default function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

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
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
            <Button title="Sign up yp" onPress={() =>navigation.navigate("SignUp")} />
        </View>
    );
}