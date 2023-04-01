import {gql} from "@apollo/client";

export function getMutation(type, name, fields) {
  return gql`mutation ($request: ${type}) { ${name} (request: $request) { ${fields} } }`;
}