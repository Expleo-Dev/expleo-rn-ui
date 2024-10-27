import React from "react";
import SignIn from "@/components/SignIn";
import Login from "@/components/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ErrorBoundary from "@/components/ErrorBoundary";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <ErrorBoundary>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerTintColor: "#000202",
          }}
        >
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Sign In" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
