import {client} from "./apollo-client";
import {AuthService} from "./auth-service";
import {getMutation, getQuery} from "../utils/graphql-utils";

export class WalletsService {
  static async getAllWallets(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.userId;
      const query = getQuery('wallets', fields);
      const {data} = await client.query({
        query,
        fetchPolicy: "network-only",
      });
      return data;
    });
  }

  static async create(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('createWallet', fields, 'WalletCreateRequestDto!')
      const {data} = await client.mutate({mutation, variables: {request}});
      return data;
    });
  }
}
