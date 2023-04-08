import {AuthService} from "./auth-service";
import {getQuery} from "../utils/graphql-utils";
import {client} from "./apollo-client";

export class StatsService {
  static async getWalletStats(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const query = getQuery('walletStats', fields, 'WalletStatsQueryRequestDto!');
      const {data} = await client.query({
        query,
        variables: {request}
      });
      return data;
    });
  }

  static async getWalletStatsByDates(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const query = getQuery('walletStatsByDates', fields, 'WalletStatsByDatesQueryRequestDto!');
      const {data} = await client.query({
        query,
        variables: {request}
      });
      return data;
    });
  }
}