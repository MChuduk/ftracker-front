import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      displayName
      email
      password
    }
  }
`;
