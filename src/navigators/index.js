import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { LoginScreen, HomeScreen, RegisterScreen, ProfileScreen } from "../container"
import NavigatorMap from "./NavigatorMap"
import { AuthContext, UserStoreProvider } from "../core";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  const authContext = React.useContext(AuthContext);
  const { isLoggedIn, checkAuthenticate } = authContext;

  const checkAuth = async () => {
    try {
      await checkAuthenticate();
    } catch (err) { }
  }

  React.useEffect(() => {
    checkAuth();
  }, [])

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name={NavigatorMap.SignIn}
            component={LoginScreen}
            options={{
              title: NavigatorMap.SignIn,
            }}
          />
          <Stack.Screen
            name={NavigatorMap.RegisterScreen}
            component={RegisterScreen}
            options={{
              title: NavigatorMap.RegisterScreen,
            }}
          />
        </Stack.Navigator>) : (
          <UserStoreProvider>
            <Drawer.Navigator initialRouteName={NavigatorMap.Home}>
              <Drawer.Screen name={NavigatorMap.Home} component={HomeScreen} />
              <Drawer.Screen name={NavigatorMap.Profile} component={ProfileScreen} />
            </Drawer.Navigator>
          </UserStoreProvider>
        )}
    </NavigationContainer>
  );
};

export default Navigator;
