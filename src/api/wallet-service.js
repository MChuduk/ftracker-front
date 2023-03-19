import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { AuthService } from "./auth-service";

export class WalletsService {
  static async create(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const { fields, name, userId } = request;
      const input = { name, userId };
      const mutation = gql`
          mutation ($input: CreateWalletInput!) {
            createWallet(input: $input) { ${fields} }
        }`;
      const { data } = await client.mutate({ mutation, variables: { input } });
      return data;
    });
  }
}
