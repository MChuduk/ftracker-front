import {AuthService} from "./auth-service";
import {getMutation, getQuery} from "../utils/graphql-utils";
import {client} from "./apollo-client";

export class TransactionService {

  static async getAll(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      const query = getQuery('transactions', fields);
      const {data} = await client.query({
        query
      });
      return data;
    });
  }

  static async create(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('createTransaction', fields, 'TransactionCreateRequestDto!')
      const {data} = await client.mutate({mutation, variables: {request}});
      return data;
    });
  }

  static async delete(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('deleteTransaction', fields, 'TransactionDeleteRequestDto!')
      const {data} = await client.mutate({mutation, variables: {request}});
      return data;
    });
  }
}
