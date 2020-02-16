import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";

export default function MovieCard(props) {
  const { item, index } = props;

  return (
    <View
      style={{
        height: "95%",
        width: "100%"
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`
          }}
          style={{ flex: 0.3 }}
        />
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
                  <Text style={{ fontFamily: "sans-serif-thin", opacity: 0.7 }}>
                    ({item.original_title})
                  </Text>
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
                271.983
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
    </View>
  );
}
