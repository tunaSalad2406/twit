import gql from 'graphql-tag';

export const FEED_QUERY = gql`
  query {
    getTwits {
      author{
        email
        id
      }
        id
        content
        createdAt
        updatedAt
        image
        interestCount
        commentCount
      }
  }
`;

export const CREATE_TWIT_SUBSCRIPTION = gql`
  subscription createTwit{
    createTwit {
      author{
        email
        id
      }
      id
      content
      createdAt
      updatedAt
      image
      interestCount
  }
}
`
export const DELETE_TWIT_SUBSCRIPTION = gql`
  subscription deleteTwit{
    deleteTwit
}
`
export const UPDATE_TWIT_SUBSCRIPTION = gql`
  subscription updateTwit{
    updateTwit {
      author{
        email
        id
      }
      id
      content
      createdAt
      updatedAt
      image
      interestCount
  }
}
`
export const INTEREST_TWIT_SUBSCRIPTION = gql`
  subscription interestTwit{
    interestTwit {
      author{
        email
        id
      }
      id
      content
      createdAt
      updatedAt
      image
      interestCount
  }
}
`
