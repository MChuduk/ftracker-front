import { gql } from "@apollo/client";
import { client, GRAPHQL_ERRORS, matchGraphqlError } from "./apollo-client";

export class AuthService {
  static async signIn(data) {
    const { fields, email, password } = data;
    const credentials = { email, password };
    const mutation = gql`mutation ($credentials: SignInLocalInput!) {
        signInLocal(credentials: $credentials) { ${fields} } 
    }`;
    return await client.mutate({ mutation, variables: { credentials } });
  }

  static async signUp(data) {
    const { fields, email, password, displayName } = data;
    const credentials = { email, password, displayName };
    const mutation = gql`mutation ($credentials: SignUpLocalInput!) {
        signUpLocal(credentials: $credentials) { ${fields} }
    }`;
    return await client.mutate({ mutation, variables: { credentials } });
  }

  static async refreshTokens(data) {
    return await this.dispatchGraphqlRequest(async () => {
      const { fields } = data;
      const mutation = gql`mutation { refresh { ${fields} } }`;
      return await client.mutate({ mutation });
    }, true);
  }

  static async getCurrentUser(data) {
    return await this.dispatchGraphqlRequest(async () => {
      const { fields } = data;
      const query = gql`query { currentUser { ${fields} } }`;
      return await client.query({ query });
    });
  }

  static async dispatchGraphqlRequest(request, refresh = false) {
    try {
      return await request();
    } catch (error) {
      if (matchGraphqlError(error, GRAPHQL_ERRORS.UNAUTHENTICATED)) {
        if (refresh) {
          this.logout();
          return;
        }
        await this.refreshTokens({ fields: "id" });
        return await request();
      }
    }
  }

  static logout() {
    localStorage.removeItem("currentUser");
    document.location.replace("/signIn");
  }
}
