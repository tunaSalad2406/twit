import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { USER_QUERY } from "./gql"

const userStore = React.createContext({});

const { Provider } = userStore;

const UserStoreProvider = ({ children }) => {
  const { loading, error, data } = useQuery(USER_QUERY);
  return <Provider value={data}>{children}</Provider>
}

export { userStore, UserStoreProvider }
