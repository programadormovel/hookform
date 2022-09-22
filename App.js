import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HookForm from "./HookForm";
import Listar from "./Listar";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HookForm">
        <Stack.Screen name="HookForm" component={HookForm} />
        <Stack.Screen name="Listar" component={Listar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
