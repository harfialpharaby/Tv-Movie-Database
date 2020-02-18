import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid
} from "react-native";
import { EvilIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { DEL_MOVIE, DEL_TV, GET_TV, GET_MOVIES } from "../graphql";

export default function ListCard(props) {
  const { item } = props;
  const dynamicFontSize = item.title.length < 50 ? 25 : 20;
  const navigation = useNavigation();
  const [delMovie] = useMutation(DEL_MOVIE);
  const [delTv] = useMutation(DEL_TV);

  const confirmRemove = () => {
    return Alert.alert(
      `Delete From My ${item.__typename}`,
      `Remove ${item.title}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => (item.__typename === "Tv" ? removeTv() : removeMovie())
        }
      ],
      { cancelable: false }
    );
  };

  const removeMovie = () => {
    delMovie({
      variables: { _id: item._id },
      update: (cache, { data }) => {
        if (data?.deleteMovie?.status) {
          const cacheData = cache.readQuery({ query: GET_MOVIES });
          const movies = cacheData.movies.filter(
            movie => movie._id != item._id
          );
          cache.writeQuery({
            query: GET_MOVIES,
            data: { movies }
          });
        }
      }
    });
    Platform.OS === "android"
      ? ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT)
      : null;
  };

  const removeTv = () => {
    delTv({
      variables: { _id: item._id },
      update: (cache, { data }) => {
        if (data?.deleteTv?.status) {
          const cacheData = cache.readQuery({ query: GET_TV });
          const tvAll = cacheData.tvAll.filter(tv => tv._id != item._id);
          cache.writeQuery({
            query: GET_TV,
            data: { tvAll }
          });
        }
      }
    });
    Platform.OS === "android"
      ? ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT)
      : null;
  };

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
            <Text style={{ fontSize: dynamicFontSize }}>{item.title}</Text>
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
            style={{ flex: 1, width: 114, elevation: 6 }}
            resizeMode="contain"
            source={{
              uri: `https://image.tmdb.org/t/p/w200${item.posterPath}`
            }}
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
              <TouchableOpacity onPress={confirmRemove}>
                <Entypo name="minus" size={30} color="black"></Entypo>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
