import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";

import Header from "../components/Header";
import MyMovieScreen from "./MyMovieScreen";
import MyTvScreen from "./MyTvScreen";
import AddButton from "../components/AddButton";

const Tab = createMaterialTopTabNavigator();

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <StatusBar translucent={true} barStyle="dark-content" />
        <Header></Header>
        <View style={{ flex: 0.9 }}>
          <Tab.Navigator swipeEnabled={false}>
            <Tab.Screen
              name="MyMovies"
              options={{ tabBarLabel: "My Movies" }}
              component={MyMovieScreen}
            />
            <Tab.Screen
              name="MyTv"
              options={{ tabBarLabel: "My Tv" }}
              component={MyTvScreen}
            />
          </Tab.Navigator>
        </View>
        <AddButton></AddButton>
      </View>
    );
  }
}

export default HomeScreen;
