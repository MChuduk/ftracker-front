import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation ($credentials: SignUpLocalInput!) {
    signUpLocal(credentials: $credentials) {
      id
      email
      password
    }
  }
`;
