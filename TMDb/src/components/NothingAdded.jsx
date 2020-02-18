import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NothingAdded(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialCommunityIcons
        name="weather-windy-variant"
        size={40}
        color="black"
      ></MaterialCommunityIcons>
      <Text style={{ textTransform: "capitalize" }}>let's explore...</Text>
    </View>
  );
}
