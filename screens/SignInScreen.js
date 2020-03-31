import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AuthContext } from "../auth/authContext";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn, signUp } = React.useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIbod4_O0wTfM_v5eBPmNcTli5Ds-8qICGzUGoqlj73mZIh_uu' }} />
              <Text style={styles.title}>Check Your Stock Knowledge Here</Text>
            </View>

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
            <View style={styles.btnContainer}>
              <Button title="Sign in" onPress={() => signIn({ username, password })} />
              <Button title="Click here to register" onPress={() => navigation.navigate("SignUp")} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    alignContent: 'center',
    padding: 20,
    width: 150,
    height: 150,
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
    color: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10
  },
});