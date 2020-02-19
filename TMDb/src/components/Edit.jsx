import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons
} from "@expo/vector-icons";
import Constants from "expo-constants";

export default function EditContent(props) {
  const navigation = useNavigation();
  const { title, overview, tags } = props.state;
  const { posterPath, popularity } = props.route.params.item;
  const [onFocus, setOnFocus] = useState(null);
  const fontSize = title.length <= 50 ? 32 : 20;

  const renderHeader = () => {
    if (!onFocus) {
      return (
        <Text style={[styles.headerText]}>Tap any text below to edit</Text>
      );
    } else if (onFocus === "title") {
      return (
        <Text style={[styles.headerText, { textTransform: "capitalize" }]}>
          Bring eye catching title
        </Text>
      );
    } else if (onFocus === "overview") {
      return (
        <Text style={[styles.headerText, { textTransform: "capitalize" }]}>
          Describe this content
        </Text>
      );
    } else if (onFocus === "tags") {
      return (
        <View>
          <Text style={[styles.headerText, { textTransform: "capitalize" }]}>
            Grouping content with tags
          </Text>
          <Text style={[styles.headerText, { marginTop: 0, marginBottom: 20 }]}>
            (separated by comma)
          </Text>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/original${posterPath}` }}
      style={styles.backgroundImg}
      blurRadius={20}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View style={styles.background}>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={navigation.goBack}
          >
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="white"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 10
              }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                fontSize: 17,
                color: "white",
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <View style={styles.editLogo}>
            <MaterialCommunityIcons name="pencil" size={25} color="black" />
          </View>
          <View style={styles.editBody}>
            {renderHeader()}

            {onFocus === "title" ? (
              <Text style={styles.focusedTitle}>Title</Text>
            ) : null}
            {onFocus === "title" || !onFocus ? (
              <TextInput
                style={[
                  styles.editContainer,
                  {
                    fontSize,
                    borderBottomWidth: onFocus === "title" ? 1 : 0,
                    borderColor: "green"
                  }
                ]}
                onFocus={() => setOnFocus("title")}
                onBlur={() => setOnFocus(null)}
                onChangeText={title => props.onChangeText({ title })}
                multiline={true}
                numberOfLines={4}
              >
                {title}
              </TextInput>
            ) : null}

            {onFocus === "overview" ? (
              <Text style={styles.focusedTitle}>overview</Text>
            ) : null}
            {onFocus === "overview" || !onFocus ? (
              <TextInput
                style={[
                  styles.editContainer,
                  { borderBottomWidth: onFocus === "overview" ? 1 : 0 }
                ]}
                onFocus={() => setOnFocus("overview")}
                onBlur={() => setOnFocus(null)}
                onChangeText={overview => props.onChangeText({ overview })}
                multiline={true}
                numberOfLines={10}
              >
                {overview}
              </TextInput>
            ) : null}

            {onFocus === "tags" ? (
              <Text style={styles.focusedTitle}>tags</Text>
            ) : null}
            {onFocus === "tags" || !onFocus ? (
              <TextInput
                style={[
                  styles.editContainer,
                  { borderBottomWidth: onFocus === "tags" ? 1 : 0 }
                ]}
                onFocus={() => setOnFocus("tags")}
                onBlur={() => setOnFocus(null)}
                onChangeText={tags => props.onChangeText({ tags })}
                multiline={true}
                numberOfLines={4}
              >
                {tags.join(", ")}
              </TextInput>
            ) : null}

            {!onFocus ? (
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  paddingRight: 30
                }}
              >
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
                  {popularity}
                </Text>
              </View>
            ) : null}
            {onFocus ? (
              <Text style={styles.footerOnFocus}>Tap anywhere to dismiss</Text>
            ) : null}
          </View>

          <View
            style={{
              flex: 0.2,
              justifyContent: "center"
            }}
          >
            {onFocus ? null : (
              <TouchableOpacity
                style={styles.btnSave}
                onPress={props.handleSubmit}
              >
                <Ionicons name="ios-save" size={25} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImg: { flex: 1, justifyContent: "center", alignItems: "center" },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    width: "80%",
    marginTop: Constants.statusBarHeight * 1.5
  },
  editLogo: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#4BC7FD",
    borderRadius: 50
  },
  headerText: {
    fontStyle: "italic",
    color: "grey",
    marginTop: 40,
    textAlign: "center"
  },
  editBody: {
    flex: 0.75,
    borderRadius: 10,
    backgroundColor: "white"
  },
  editContainer: {
    marginHorizontal: 20,
    textAlign: "center"
  },
  focusedTitle: {
    marginLeft: 30,
    color: "green",
    textTransform: "uppercase"
  },
  footerOnFocus: {
    textAlign: "center",
    color: "grey",
    fontStyle: "italic",
    marginTop: 10,
    textTransform: "capitalize"
  },
  btnSave: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#00b894",
    borderRadius: 50
  }
});
