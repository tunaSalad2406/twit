import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation register($email:String!,$password: String!){
    register( input: { email: $email, password: $password}){
      email
      id
  }
}
`
