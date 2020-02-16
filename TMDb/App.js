import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ApolloProvider } from "@apollo/react-hooks";

import apolloClient from "./src/config/graphql";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
import TvScreen from "./src/screens/TvScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <StatusBar barStyle="default" />
        <Drawer.Navigator>
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ drawerLabel: "Home" }}
          />
          <Drawer.Screen
            name="Movie"
            component={MovieScreen}
            options={{ drawerLabel: "Explore" }}
          />
          <Drawer.Screen
            name="Tv"
            component={TvScreen}
            options={{ drawerLabel: "TV" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
