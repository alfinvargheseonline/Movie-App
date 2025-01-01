import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./screen/Homepage"; // assuming it's the main screen
import MovieDetail from "./screen/MovieDetail";
import AiringToday from "./screen/AiringToday";
import OnTheAir from "./screen/OnTheAir";
import Popular from "./screen/Popular";
import Actors from "./screen/Actors";
import Video from "./screen/Video";
// your movie detail screen component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }} // Hide the header for the Homepage screen
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AiringToday"
          component={AiringToday}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnTheAir"
          component={OnTheAir}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Popular"
          component={Popular}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Actors"
          component={Actors}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
