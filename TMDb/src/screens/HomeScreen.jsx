import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class HomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Home Screen</Text>
        <Button title="Open Drawer" onPress={navigation.openDrawer}>
          <Text>Open Drawer</Text>
        </Button>
      </View>
    );
  }
}

export default HomeScreen;
