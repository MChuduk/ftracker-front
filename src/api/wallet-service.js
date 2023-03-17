import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { AuthService } from "./auth-service";

export class WalletsService {
  static async create(data) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const { fields, name, userId } = data;
      const input = { name, userId };
      const mutation = gql`
          mutation ($input: CreateWalletInput!) {
            createWallet(input: $input) { ${fields} }
        }`;
      return await client.mutate({ mutation, variables: { input } });
    });
  }
}
