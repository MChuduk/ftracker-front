import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:3001/api/graphql/",
  credentials: 'include',
  cache: new InMemoryCache(),
});
