import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import Detail from "../components/Detail";

export default function RootNavigation(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        // options={{
        //   header: ({ scene, previous, navigation }) => {
        //     if (navigation.canGoBack()) {
        //       return (
        //         <TouchableOpacity
        //           style={{
        //             width: 43,
        //             marginTop: Constants.statusBarHeight * 2,
        //             marginLeft: 20,
        //             padding: 5,
        //             borderRadius: 20,
        //             shadowColor: "#000",
        //             shadowOffset: {
        //               width: 0,
        //               height: 2
        //             },
        //             shadowOpacity: 0.25,
        //             shadowRadius: 3.84,
        //             elevation: 5,
        //             backgroundColor: "white"
        //           }}
        //           onPress={navigation.goBack}
        //         >
        //           <Feather name="arrow-left" size={32} color="black" />
        //         </TouchableOpacity>
        //       );
        //     }
        //   }
        // }}
      />
    </Stack.Navigator>
  );
}
