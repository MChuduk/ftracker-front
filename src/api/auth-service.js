import {client, GRAPHQL_ERRORS, matchGraphqlError} from "./apollo-client";
import {getMutation, getQuery} from "../utils/graphql-utils";

export class AuthService {
  static async signIn(request) {
    const {fields} = request;
    delete request.fields;
    const mutation = getMutation('signIn', fields, 'SignInRequestDto!');
    const {data} = await client.mutate({mutation, variables: {request}});
    return data;
  }

  static async signUp(request) {
    const {fields} = request;
    delete request.fields;
    delete request.confirmPassword;
    const mutation = getMutation('signUp', fields, 'SignUpRequestDto!');
    const {data} = await client.mutate({mutation, variables: {request}});
    return data;
  }

  static async refreshTokens(request) {
    return await this.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      const mutation = getMutation('refresh', fields);
      const {data} = await client.mutate({mutation});
      return data;
    }, true);
  }

  static async getCurrentUser(request) {
    return await this.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      const query = getQuery('currentUser', fields);
      const {data} = await client.query({query});
      return data;
    });
  }

  static async dispatchGraphqlRequest(request, refresh = false) {
    try {
      return await request();
    } catch (error) {
      if (matchGraphqlError(error, GRAPHQL_ERRORS.UNAUTHENTICATED)) {
        if (refresh) {
          this.logout({fields: "id"});
          return;
        }
        await this.refreshTokens({fields: "id"});
        return await request();
      }
    }
  }

  static async logout(request) {
    const {fields} = request;
    const mutation = getMutation('logout', fields);
    localStorage.removeItem("currentUser");
    document.location.replace("/signIn");
    const {data} = await client.mutate({mutation});
    return data;
  }
}
