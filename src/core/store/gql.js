import gql from "graphql-tag";

export const USER_QUERY = gql`
  query {
    me {
      email
      id
  }}
`;

