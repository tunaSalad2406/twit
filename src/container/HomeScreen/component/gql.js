import gql from 'graphql-tag';

export const UPDATE_MUTATION = gql`
  mutation UpdateTwit($id:ID!, $content:String){
      updateTwit(input:{id:$id,content:$content}){
        content
        id
    }
  }
`;

export const CREATE_MUTATION = gql`
  mutation CreateTwit($content:String,$file:GraphQLUpload){
    createTwit(input:{
    content: $content,
    file: $file
    }){
      content
      createdAt
      image
    }
  }
`;

