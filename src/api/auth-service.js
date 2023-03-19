import { gql } from "@apollo/client";
import { client, GRAPHQL_ERRORS, matchGraphqlError } from "./apollo-client";

export class AuthService {
  static async signIn(request) {
    const { fields, email, password } = request;
    const credentials = { email, password };
    const mutation = gql`mutation ($credentials: SignInLocalInput!) {
        signInLocal(credentials: $credentials) { ${fields} } 
    }`;
    const { data } = await client.mutate({ mutation, variables: { credentials } });
    return data;
  }

  static async signUp(request) {
    const { fields, email, password, displayName } = request;
    const credentials = { email, password, displayName };
    const mutation = gql`mutation ($credentials: SignUpLocalInput!) {
        signUpLocal(credentials: $credentials) { ${fields} }
    }`;
    const { data } = await client.mutate({ mutation, variables: { credentials } });
    return data;
  }

  static async refreshTokens(request) {
    return await this.dispatchGraphqlRequest(async () => {
      const { fields } = request;
      const mutation = gql`mutation { refresh { ${fields} } }`;
      const { data } = await client.mutate({ mutation });
      return data;
    }, true);
  }

  static async getCurrentUser(request) {
    return await this.dispatchGraphqlRequest(async () => {
      const { fields } = request;
      const query = gql`query { currentUser { ${fields} } }`;
      const { data } = await client.query({ query });
      return data;
    });
  }

  static async dispatchGraphqlRequest(request, refresh = false) {
    try {
      return await request();
    } catch (error) {
      if (matchGraphqlError(error, GRAPHQL_ERRORS.UNAUTHENTICATED)) {
        if (refresh) {
          this.logout({ fileds: "id" });
          return;
        }
        await this.refreshTokens({ fields: "id" });
        return await request();
      }
    }
  }

  static async logout(request) {
    const { fields } = request;
    const mutation = gql`mutation { logout { ${fields} } }`;

    localStorage.removeItem("currentUser");
    document.location.replace("/signIn");
    const { data } = await client.mutate({ mutation });
    return data;
  }
}
