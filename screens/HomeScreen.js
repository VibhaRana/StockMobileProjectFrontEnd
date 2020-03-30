import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './SearchScreen';
import PortfolioScreen from './PortfolioScreen';
import WatchedScreen from './WatchedScreen';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation, route }) {
    const routeName = route.state?.routes[route.state.index]?.name ?? "Search";
    navigation.setOptions({ headerTitle: routeName });

    return (
        <SafeAreaView>
            <Tab.Navigator initialRouteName="Search">
                <Tab.Screen name="Watchlist" component={WatchedScreen} options={{ tabBarIcon: () => <FontAwesome style={styles.icon} name="bookmark" /> }} />
                <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: () => <FontAwesome style={styles.icon} name="search" /> }} />
                <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{ tabBarIcon: () => <FontAwesome style={styles.icon} name="pie-chart" /> }} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        alignSelf: 'center',
    }
});