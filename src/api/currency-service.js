import {AuthService} from "./auth-service";
import {client} from "./apollo-client";
import {getQuery} from "../utils/graphql-utils";

export class CurrencyService {
  static async getAll(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      const query = getQuery('currency', fields);
      const {data} = await client.query({
        query
      });
      return data;
    });
  }
}