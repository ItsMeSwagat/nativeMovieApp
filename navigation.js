import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import React from "react";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import PersonScreen from "./screens/PersonScreen";

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
