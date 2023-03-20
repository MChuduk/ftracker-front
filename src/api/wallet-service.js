import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { AuthService } from "./auth-service";

export class WalletsService {
  static async getAllWallets(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const { fields, userId } = request;
      const input = { userId };
      const query = gql`
        query ($input: GetAllWalletsDto!) {
          getAllWallets(input: $input) { ${fields} }
      }`;
      const { data } = await client.query({
        query,
        variables: { input },
        fetchPolicy: "network-only",
      });
      return data;
    });
  }

  static async create(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const { fields, name, userId } = request;
      const input = { name, userId };
      const mutation = gql`
          mutation ($input: CreateWalletDto!) {
            createWallet(input: $input) { ${fields} }
        }`;
      const { data } = await client.mutate({ mutation, variables: { input } });
      return data;
    });
  }
}
