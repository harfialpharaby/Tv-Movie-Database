import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function PosterImage(props) {
  const { poster_path } = props;

  return (
    <ImageBackground
      source={{
        uri: `https://image.tmdb.org/t/p/original${poster_path}`
      }}
      style={{
        flex: 0.8,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TouchableOpacity>
        <EvilIcons name="play" size={100} color="white"></EvilIcons>
      </TouchableOpacity>
    </ImageBackground>
  );
}
