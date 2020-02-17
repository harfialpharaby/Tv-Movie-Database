import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { EvilIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ListCard(props) {
  const { item } = props;
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <View
        style={{
          flex: 1,
          margin: 10,
          height: 160,
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "white",
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
          <View style={{ flex: 0.65, margin: 5, marginBottom: 10 }}>
            <Text style={{ fontSize: 25 }}>{item.title}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <EvilIcons
                name="like"
                size={20}
                color={"grey"}
                style={{
                  opacity: 0.5,
                  alignSelf: "baseline"
                }}
              />
              <Text style={{ alignSelf: "baseline", color: "grey" }}>
                {item.popularity}
              </Text>
            </View>
            <Text style={{ textTransform: "capitalize" }}>
              {item.tags.join(", ")}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 150
          }}
        >
          <ImageBackground
            style={{ flex: 1, width: 120, elevation: 6 }}
            resizeMode="contain"
            source={{ uri: item.posterPath }}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                top: 0,
                left: 7,
                width: 40,
                height: 50,
                opacity: 0.7,
                justifyContent: "center",
                alignItems: "center",
                borderBottomRightRadius: 15,
                backgroundColor: "#46CFBF"
              }}
            >
              <TouchableOpacity onPress={() => console.log(item._id)}>
                <Entypo name="minus" size={30} color="black"></Entypo>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
