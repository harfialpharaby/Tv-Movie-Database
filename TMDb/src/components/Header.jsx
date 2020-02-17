import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 0.1,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "black"
      }}
    >
      <View style={{ flex: 0.9, flexDirection: "row" }}>
        <Text
          style={{
            flex: 0.2,
            fontSize: 20,
            borderWidth: 2,
            margin: 7,
            padding: 3,
            textAlignVertical: "center",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            borderRadius: 6,
            borderColor: "black",
            fontWeight: "bold"
          }}
        >
          TMDb
        </Text>
        <View style={{ flex: 0.6, justifyContent: "center" }}>
          <Text>TV</Text>
          <Text>Movies</Text>
          <Text>Database</Text>
        </View>
      </View>
      <View
        style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Image
            source={require("../../assets/drawer.png")}
            style={{
              height: 30,
              width: 30,
              alignSelf: "center",
              tintColor: "black"
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
