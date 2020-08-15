import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import NavigatorMap from "../../navigators/NavigatorMap"
import { LOGIN_MUTATION } from "./gql"
import { AuthContext, utils } from "../../core"
import { LOGIN } from "../../constant"

export const LoginScreen = props => {
  const [login] = useMutation(LOGIN_MUTATION);
  const [email, setEmail] = React.useState("thanh@tho");
  const [password, SetPassword] = React.useState("123456");

  const authStore = React.useContext(AuthContext);
  const { checkAuthenticate } = authStore;

  const submit = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      const tokens = {
        accessToken: data.login.accessToken,
        refreshToken: data.login.refreshToken
      }
      await checkAuthenticate(data.login.accessToken);
      utils.setSuccess(LOGIN.SUCCESSFUL)
    } catch (err) {
      console.log(err)
      utils.setError(LOGIN.FAILED)
    }
  }

  const navigateRegister = () => {
    props.navigation.navigate(NavigatorMap.RegisterScreen)
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        placeholder="email"></TextInput>
      <TextInput
        onChangeText={SetPassword}
        secureTextEntry
        value={password}
        style={styles.input}
        placeholder="password"></TextInput>
      <TouchableOpacity
        onPress={submit}
        style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateRegister}
        style={styles.button}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  input: { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 20, marginVertical: 10, minWidth: "70%" },
  button: { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 20, marginVertical: 10, minWidth: "70%", justifyContent: 'center', alignItems: 'center' }
})


