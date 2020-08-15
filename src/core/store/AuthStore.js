import React from "react";
import AsyncStorage from "@react-native-community/async-storage"
import { USER_QUERY } from "./gql"
import { useQuery } from "@apollo/react-hooks"
import { ACCESS_TOKENS } from "../../constant"

export const authHandler = () => {
  const [isLoggedIn, setLoggin] = React.useState(false);
  const login = () => {
    setLoggin(true)
  }
  const logout = () => {
    setLoggin(false)
  }
  const checkAuthenticate = async (token = "") => {
    try {
      if (token) {
        await AsyncStorage.setItem(ACCESS_TOKENS, token)
        login()
      } else {
        const _token = await AsyncStorage.getItem(ACCESS_TOKENS);
        if (_token) {
          login()
        }
      }
    } catch (err) { }
  }
  return { login, logout, checkAuthenticate, isLoggedIn };
}

export const AuthContext = React.createContext(null);
