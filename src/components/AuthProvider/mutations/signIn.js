import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation ($credentials: SignInLocalInput!) {
    signInLocal(credentials: $credentials) {
        id
    }
  }
`;
