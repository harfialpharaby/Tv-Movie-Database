import React from "react";
import { View, TouchableHighlight } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AddButton(props) {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={{ position: "absolute", right: 30, bottom: 30 }}
      onPress={() => navigation.navigate("Movie")}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: "#4BC7FD",
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
        }}
      >
        <Entypo name="plus" size={30} color="black" />
      </View>
    </TouchableHighlight>
  );
}
