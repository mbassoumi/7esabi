import { FieldPolicy, Reference } from '@apollo/client';

type KeyArgs = FieldPolicy<any>['keyArgs'];

export function paginationWithNoCache<T = Reference>(
  keyArgs: KeyArgs = false
): FieldPolicy<T[]> {
  return {
    keyArgs,
    merge(existing, incoming, { args }) {
      return incoming || [];
    },
  };
}
