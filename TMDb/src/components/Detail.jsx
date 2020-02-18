import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function Detail(props) {
  const { item } = props.route.params;
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/original${item.posterPath}` }}
      style={{
        flex: 1,
        width,
        justifyContent: "flex-end"
      }}
      imageStyle={{
        bottom: 200
      }}
    >
      <StatusBar translucent={true} barStyle="default"></StatusBar>
      {navigation.canGoBack() ? (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            position: "absolute",
            left: 20,
            top: Constants.statusBarHeight * 2
          }}
        >
          <View
            style={{
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
            <Feather name="arrow-left" size={32} color="black" />
          </View>
        </TouchableOpacity>
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
        onPress={() => navigation.navigate("Edit", { item })}
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
          <Text
            style={{
              textTransform: "capitalize",
              marginVertical: 5,
              color: "grey"
            }}
          >
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
          <Text style={{ letterSpacing: 1 }}>{item.overview}</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
