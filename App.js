import * as React from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native'; 
// import WatchList from './screens/WatchList';
import Header from './components/Header';
import { AsyncStorage, Button, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen"
import SignUpScreen from "./screens/SignUpScreen"
import { AuthContext } from "./auth/authContext"
import AuthAPI2 from "./auth/AuthAPIClass"


import{ AppLoading } from 'expo';





// export default function App(){
//   return (
//     <View style={styles.screen}>
//     <Header title = "Best Brokers" />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1
//   }
// })



import DetailScreen from "./screens/DetailScreen"

const Stack = createStackNavigator();
//context for sign in, sign up, restore method
//export const AuthContext = React.createContext();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
 
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log(`user input username :${data.username}`)
        console.log("Sign In!!!!")
        var result = await AuthAPI2.login(data.username, data.password)
        //console.log(result)
        if (result.status == 200) {
          try {
            await AsyncStorage.setItem('userToken', result.token);
            dispatch({ type: 'SIGN_IN', token: result.token });
          } catch (error) {
            // Error saving data
          }
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken')
        } catch (e) {

        }
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        console.log("Sign up!!!!")
        var result = await AuthAPI2.SignUp(data.username, data.password, data.comfirmPassword)
        console.log("Im here!================")
        console.log(result)
        if (result&&result.status ==200) {
          try {
            console.log("Im here!====before sign in")
            var loginResult = await AuthAPI2.login(data.username, data.password)
            console.log("Im here!====after sign in")
            if (loginResult.status == 200) {
              try {
                await AsyncStorage.setItem('userToken', loginResult.token);
                dispatch({ type: 'SIGN_IN', token: loginResult.token });
              } catch (error) {
                console.log("error found log in nooo00") // Error saving data
              }
            } else {
              console.log("error found log in nooo")
            }
          } catch (error) {
            console.log("error found log in")
          }
        }
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        //  dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </Stack.Navigator>
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: 'Sign Up',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          </Stack.Navigator>
        ) : (
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
              </Stack.Navigator>
            )}
      </NavigationContainer>
    </AuthContext.Provider>
    
  );
  
}


