import React from 'react';
import { ApolloProvider } from "react-apollo";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext, authHandler, config } from "./src/core";
import { Root } from 'native-base';
import Navigator from "./src/navigators"

const App = () => {
  const { Provider } = AuthContext;

  React.useEffect(() => {
    Ionicons.loadFont();
  }, [])

  return (
    <ApolloProvider client={config.client}>
      <Provider value={authHandler()}>
        <Root>
          <Navigator />
        </Root>
      </Provider>
    </ApolloProvider>
  );
};


export default App;
