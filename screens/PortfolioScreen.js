import React from 'react';
import { AsyncStorage, View, Text, Button } from 'react-native';
import { AuthContext } from "../auth/authContext";

export default function PortfolioScreen() {
  const { signOut } = React.useContext(AuthContext);
  const [token, setToken] = React.useState();

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

  return (
    <View>
      <Text>Signed in! YO: {token}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}