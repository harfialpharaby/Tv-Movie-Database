import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function LoadingIndicator() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="blue" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          letterSpacing: 5,
          textTransform: "uppercase"
        }}
      >
        Loading...
      </Text>
    </View>
  );
}
