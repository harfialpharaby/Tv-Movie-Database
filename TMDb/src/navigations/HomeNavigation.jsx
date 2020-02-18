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
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
