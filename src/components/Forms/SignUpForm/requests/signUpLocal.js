import { gql } from "@apollo/client";

export const SIGN_UP_LOCAL = gql`
  mutation ($credentials: SignUpLocalInput!) {
    signUpLocal(credentials: $credentials) {
      id
      email
      password
    }
  }
`;
