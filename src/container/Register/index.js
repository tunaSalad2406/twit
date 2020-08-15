import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from "react-native"
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_MUTATION } from "./gql"
import { utils } from "../../core"
import { REGISTER } from "../../constant"

export const RegisterScreen = props => {
  const [register] = useMutation(REGISTER_MUTATION);
  const [email, setEmail] = React.useState("");
  const [password, SetPassword] = React.useState("")

  const submit = async () => {
    try {
      const { data } = await register({ variables: { email, password } });
      utils.setSuccess(REGISTER.SUCCESSFUL)
      Alert.alert(
        'Register',
        'Register successful',
        [
          {
            text: 'OK', onPress: () => {
              Keyboard.dismiss();
              props.navigation.goBack()
            }
          },
          { text: 'Cancel', onPress: () => { }, style: '' },
        ],
        { cancelable: false }
      )
    } catch (err) {
      console.log(err)
      utils.setError(REGISTER.FAILED)
    }
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


