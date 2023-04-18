import {client} from "./apollo-client";
import {AuthService} from "./auth-service";
import {getMutation, getQuery} from "../utils/graphql-utils";

export class WalletsService {
  static async getAllWallets(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const query = getQuery('wallets', fields, 'WalletQueryRequestDto!');
      const {data} = await client.query({
        query,
        fetchPolicy: "network-only",
        variables: {request}
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

  static async update(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('updateWallet', fields, 'WalletUpdateRequestDto!')
      const {data} = await client.mutate({mutation, variables: {request}});
      return data;
    });
  }

  static async delete(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('deleteWallet', fields, 'WalletDeleteRequestDto!')
      const {data} = await client.mutate({mutation, variables: {request}});
      return data;
    });
  }
}
