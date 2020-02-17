import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

import HomeNavigation from "./HomeNavigation";
import MovieScreen from "../screens/MovieScreen";

export default function RootNavigation(props) {
  return (
    <Drawer.Navigator drawerType="slide" activeTintColor="blue">
      <Drawer.Screen
        name="HomeScreen"
        component={HomeNavigation}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="Movie"
        component={MovieScreen}
        options={{ drawerLabel: "Explore" }}
      />
    </Drawer.Navigator>
  );
}
