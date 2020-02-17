import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/react-hooks";

import apolloClient from "./src/config/graphql";
import RootNavigation from "./src/navigations/RootNavigation";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <StatusBar barStyle="default" />
        <RootNavigation></RootNavigation>
      </NavigationContainer>
    </ApolloProvider>
  );
}
