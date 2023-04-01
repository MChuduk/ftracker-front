import {AuthService} from "./auth-service";
import {gql} from "@apollo/client";
import {client} from "./apollo-client";

export class CurrencyService {
  static async getAll(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      const query = gql`query { getAllCurrency { ${fields} } }`;
      const {data} = await client.query({
        query
      });
      return data;
    });
  }
}