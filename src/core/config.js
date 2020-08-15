import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import AsyncStorage from "@react-native-community/async-storage"
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { split } from 'apollo-link';
import { ACCESS_TOKENS } from "../constant"

const URL = 'afternoon-gorge-81699.herokuapp.com/graphql'
const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: `https://${URL}`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKENS);
  return {
    headers: {
      ...headers,
      "x-access-token": token,
    }
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://${URL}`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({ cache, link });

export default { client }


