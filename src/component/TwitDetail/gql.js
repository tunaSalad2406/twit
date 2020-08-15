import gql from "graphql-tag"

export const DETAIL_QUERY = gql`
  query getTwit($id:ID!){
          getTwit(id:$id){
            author {
              email
              id
            }
            id
            content
            createdAt
            updatedAt
            image
            interestCount
            comments {
              content
              id
            }
      }
    }
`;

export const COMMENT_QUERY = gql`
  query getComments($id:ID!){
      getComments(id:$id){
        id
        content
        createdAt
        updatedAt
        user {
          email
          id
        }
      }
    }
`;

export const COMMENT_MUTATION = gql`
  mutation commentTwit($id:ID!,$content:String){
      commentTwit(input:{id:$id,content:$content}){
        content
        id
        comments{
          content
        }
    }
  }
`
export const COMMENT_TWIT_SUBSCRIPTION = gql`
  subscription commentTwit{
    commentTwit {
      author{
        email
        id
      }
      id
      createdAt
      updatedAt
      image
      comments{
        content
        id
      }
  }
}
`
