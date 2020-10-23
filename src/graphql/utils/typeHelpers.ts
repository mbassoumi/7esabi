import { GqlFragmentAccount_permissions } from '../gql/client-schema/types/GqlFragmentAccount';
import { GqlFragmentAccountGroup } from '../gql/client-schema/types/GqlFragmentAccountGroup';
import { AccountGroupInput } from '../gql/globalTypes';

export const convertToAccountGroupInput = (
  accountGroup?: GqlFragmentAccountGroup | null
): AccountGroupInput => ({
  id: accountGroup?.id,
  name: accountGroup?.name || '',
});

export const convertToAccountPermissionsInput = (
  accountPermission: GqlFragmentAccount_permissions
) => ({
  userId: accountPermission.user.id,
  canEdit: accountPermission.canEdit,
});
