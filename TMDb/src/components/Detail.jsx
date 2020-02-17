import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  Button
} from "react-native";
import MaskedView from "@react-native-community/masked-view";
import { useNavigation } from "@react-navigation/native";
import {
  Feather,
  Entypo,
  EvilIcons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import Constants from "expo-constants";

export default function Detail(props) {
  const { item } = props.route.params;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  return (
    <ImageBackground
      source={{ uri: item.posterPath }}
      style={{
        flex: 1,
        // marginTop: Constants.statusBarHeight,
        width,
        justifyContent: "flex-end"
      }}
    >
      <StatusBar barStyle="default"></StatusBar>
      {navigation.canGoBack() ? (
        <View
          style={{
            position: "absolute",
            left: 20,
            top: Constants.statusBarHeight * 2,
            padding: 10,
            borderRadius: 50,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            zIndex: 1
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Feather name="arrow-left" size={32} color="black" />
          </TouchableOpacity>
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 290,
          right: 20,
          zIndex: 1,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          backgroundColor: "#4BC7FD",
          borderRadius: 50
        }}
      >
        <MaterialCommunityIcons name="pencil" size={25} color="black" />
      </TouchableOpacity>
      <View
        style={{
          flex: 0.5,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <ScrollView
          style={{ margin: 25, marginBottom: 0 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: 30 }}>{item.title}</Text>
          <Text style={{ textTransform: "capitalize", marginVertical: 5 }}>
            {item.tags.join(" | ")}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <EvilIcons
              name="like"
              size={20}
              style={{
                opacity: 0.5,
                alignSelf: "baseline"
              }}
            />
            <Text>{item.popularity}</Text>
          </View>
          <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
            Overview
          </Text>
          <Text>{item.overview}</Text>
          {/* <Text>{JSON.stringify(item)}</Text> */}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
