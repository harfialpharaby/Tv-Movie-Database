import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { EvilIcons, Feather, Entypo } from "@expo/vector-icons";

import AddModal from "./AddModal";

export default function MovieCard(props) {
  const { item, poster } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        height: "95%",
        width: "100%"
      }}
    >
      {modalVisible ? (
        <AddModal
          visible={modalVisible}
          setVisible={setModalVisible}
          {...props}
        ></AddModal>
      ) : null}
      <ImageBackground
        source={{ uri: poster }}
        style={{ flex: 0.3, height: 135 }}
        resizeMethod="scale"
      >
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: 40,
            height: 50,
            opacity: 0.8,
            justifyContent: "center",
            alignItems: "center",
            borderBottomRightRadius: 15,
            backgroundColor: "black"
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Entypo name="plus" size={30} color="white"></Entypo>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{ flex: 0.7 }}>
        <View
          style={{
            flex: 1,
            marginVertical: 10,
            marginRight: 10,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10
          }}
        >
          <View style={{ flex: 0.8 }}>
            <Text
              style={{
                margin: 10,
                fontSize: 15,
                fontFamily: "sans-serif",
                textTransform: "uppercase"
              }}
            >
              {item.title}{" "}
              {item.original_title !== item.title ? (
                <Text style={{ color: "grey" }}>({item.original_title})</Text>
              ) : null}
            </Text>
          </View>
          <View style={{ flex: 0.2, flexDirection: "row", marginLeft: 10 }}>
            <EvilIcons
              name="like"
              size={20}
              style={{
                opacity: 0.5,
                alignSelf: "baseline"
              }}
            />
            <Text
              style={{
                alignSelf: "baseline",
                fontFamily: "sans-serif-thin"
              }}
            >
              {item.popularity}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            height: 50,
            width: 50,
            right: 0,
            bottom: 0,
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EAB543"
          }}
        >
          <Feather name="info" size={20}></Feather>
          <Text style={{ fontWeight: "bold" }}>INFO</Text>
        </View>
      </View>
    </View>
  );
}
