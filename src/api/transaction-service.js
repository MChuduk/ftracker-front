import {AuthService} from "./auth-service";
import {getMutation} from "../utils/graphql-utils";
import {client} from "./apollo-client";

export class TransactionService {
  static async create(request) {
    return await AuthService.dispatchGraphqlRequest(async () => {
      const {fields} = request;
      delete request.fields;
      const mutation = getMutation('createTransaction', fields, 'TransactionCreateRequestDto!')
      const {data} = await client.mutate({mutation, variables: {request}});
      return data;
    });
  }
}
