import {ApolloClient, InMemoryCache} from "@apollo/client";

export const GRAPHQL_ERRORS = {
  UNAUTHENTICATED: "UNAUTHENTICATED",
};

export function matchGraphqlError({graphQLErrors}, code) {
  const errorCodes = graphQLErrors?.map((error) => error.extensions.code);
  return errorCodes?.includes(code);
}

export const client = new ApolloClient({
  uri: "http://192.168.253.209:3001/api/graphql/",
  credentials: 'include',
  cache: new InMemoryCache(),
});
