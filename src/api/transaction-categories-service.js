import {AuthService} from "./auth-service";
import {getMutation, getQuery} from "../utils/graphql-utils";
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
      delete request.fields;
      const query = getQuery('transactionCategories', fields, 'TransactionQueryCategoryDto!');
      const {data} = await client.query({query, fetchPolicy: 'network-only', variables: {request}});
      return data;
    });
  }

  static async updateTransactionCategories(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('updateTransactionCategory', fields, 'TransactionCategoryUpdateDto!');
      const {data} = await client.mutate({mutation, fetchPolicy: 'network-only', variables: {request}});
      return data;
    });
  }

  static async deleteTransactionCategories(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('deleteTransactionCategory', fields, 'TransactionCategoryDeleteRequestDto!');
      const {data} = await client.mutate({mutation, fetchPolicy: 'network-only', variables: {request}});
      return data;
    });
  }

  static async createTransactionCategories(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('createTransactionCategory', fields, 'TransactionCategoryCreateRequestDto!');
      const {data} = await client.mutate({mutation, fetchPolicy: 'network-only', variables: {request}});
      return data;
    });
  }
}
