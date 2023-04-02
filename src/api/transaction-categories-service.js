import {AuthService} from "./auth-service";
import {getQuery} from "../utils/graphql-utils";
import {client} from "./apollo-client";

export class TransactionCategoriesService {
  static async getDefaultTransactionCategories(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      const query = getQuery('defaultTransactionCategories', fields);
      const {data} = await client.query({query, fetchPolicy: 'network-only'});
      return data;
    });
  }

  static async getTransactionCategories(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      const query = getQuery('transactionCategories', fields);
      const {data} = await client.query({query, fetchPolicy: 'network-only'});
      return data;
    });
  }
}