import gql from 'graphql-tag';

export const DELETE_MUTATION = gql`
  mutation deleteTwit($id:ID!){
    deleteTwit(id:$id)
  }
`;

export const INTEREST_MUTATION = gql`
  mutation interestTwit($twitID:ID!){
    interestTwit(twitID:$twitID)
  }
`;

