import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AddButton(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: "absolute",
        right: 30,
        bottom: 30,
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#4BC7FD",
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
      <TouchableOpacity onPress={() => navigation.navigate("Movie")}>
        <Entypo name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}
