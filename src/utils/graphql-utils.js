import {gql} from "@apollo/client";

export function getMutation(name, fields, type) {
  return gql`mutation ${type ? `($request: ${type})` : ''} { ${name} ${type ? '(request: $request)' : ''} { ${fields} } }`;
}

export function getQuery(name, fields, type) {
  return gql`query ${type ? `($request: ${type})` : ''} { ${name} ${type ? '(request: $request)' : ''} { ${fields} } }`;
}