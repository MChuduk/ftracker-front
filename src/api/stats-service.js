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
        variables: {request},
        fetchPolicy: 'network-only'
      });
      return data;
    });
  }

  static async getUserBudgetReport(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const query = getQuery('userBudgetReport', fields, 'TransactionQueryRequestDto!');
      const {data} = await client.query({
        query,
        variables: {request},
        fetchPolicy: 'network-only'
      });
      return data;
    });
  }

  static async getWalletActivityReport(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const query = getQuery('walletActivityReport', fields, 'WalletActivityReportQueryRequestDto!');
      const {data} = await client.query({
        query,
        variables: {request},
        fetchPolicy: 'network-only'
      });
      return data;
    });
  }

  static async getTransactionsCategoriesReport(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const query = getQuery('transactionCategoriesReport', fields, 'TransactionCategoriesStatsQueryDto!');
      const {data} = await client.query({
        query,
        variables: {request},
        fetchPolicy: 'network-only'
      });
      return data;
    });
  }
}
