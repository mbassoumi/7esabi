import {
  faCheckCircle,
  faPen,
  faTimesCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button, Select, Switch, Table } from 'antd';
import { drop, filter, find } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GqlFragmentBasicUserInfo } from '../../graphql/gql/client-schema/types/GqlFragmentBasicUserInfo';
import { AccountPermissionInput } from '../../graphql/gql/globalTypes';
import { useAllUsers, useCurrentUser } from '../helpers/storeHelper';
import AllUsersSelector from '../shared/allUsersSelector';

interface AccountPermissionsFormProps {
  accountPermissions: AccountPermissionInput[];
  updateAccountPermission?: (
    userId: string,
    accountPermission: AccountPermissionInput | null
  ) => any;
  editMode?: boolean;
}

interface AccountPermissionsFormState {
  columnDefs: any[];
  dataSource: AccountPermissionsFormTableRecord[];
  possibleUsers: GqlFragmentBasicUserInfo[];
}

interface AccountPermissionsFormTableRecord {
  key: string;
  name: string;
  canEdit: boolean;
  deleteAction: (event: any) => any;
  onCanEditChange: (checked: boolean) => any;
  editMode: boolean;
}

const columnDefs = [
  {
    key: 'deleteAction',
    render: (value: any, record: AccountPermissionsFormTableRecord) => (
      <>
        {
          <Button
            onClick={record.deleteAction}
            type="link"
            disabled={!record.editMode}
          >
            <FontAwesomeIcon icon={faTrash} color="red" />
          </Button>
        }
      </>
    ),
  },
  {
    dataIndex: 'name',
    key: 'name',
  },
  {
    key: 'canEdit',
    dataIndex: 'canEdit',
    render: (canEdit: boolean, record: AccountPermissionsFormTableRecord) => (
      <>
        {record.editMode ? (
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faPen} color="white" />}
            unCheckedChildren={<FontAwesomeIcon icon={faPen} color="gray" />}
            checked={canEdit}
            onChange={record.onCanEditChange}
          />
        ) : record.canEdit ? (
          <FontAwesomeIcon
            icon={faCheckCircle}
            color="green"
            style={{ margin: 'auto 25px' }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faTimesCircle}
            color="red"
            style={{ margin: 'auto 25px' }}
          />
        )}
      </>
    ),
  },
];

const AccountPermissionsForm = ({
  accountPermissions = [],
  updateAccountPermission,
  editMode = false,
}: AccountPermissionsFormProps) => {
  const allUsers = useAllUsers();
  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  const [state, setState] = useState({
    columnDefs: columnDefs,
    dataSource: [],
    possibleUsers: [],
  } as AccountPermissionsFormState);

  useEffect(() => {
    let adjustedColumnDefs: any = columnDefs;
    if (!editMode) {
      adjustedColumnDefs = drop(adjustedColumnDefs, 1); // drop the first column (the delete button)
    }
    for (let i = 0; i < adjustedColumnDefs.length; i++) {
      if (adjustedColumnDefs[i].key === 'name') {
        adjustedColumnDefs[i]['title'] = t(
          'accountPermission.form.userNameColumn'
        );
      } else if (adjustedColumnDefs[i].key === 'canEdit') {
        adjustedColumnDefs[i]['title'] = t(
          'accountPermission.form.canEditColumn'
        );
      }
    }

    setState({
      columnDefs: adjustedColumnDefs,
      dataSource: accountPermissions.map((accountPermission) => ({
        key: accountPermission.userId,
        name: nameForUser(accountPermission.userId),
        canEdit: !!accountPermission.canEdit,
        deleteAction: (event: any) =>
          updateAccountPermission!(accountPermission.userId, null),
        onCanEditChange: (checked: boolean) =>
          updateAccountPermission!(accountPermission.userId, {
            ...accountPermission,
            canEdit: checked,
          }),
        editMode,
      })),
      possibleUsers: filter(
        allUsers,
        (user) => !find(accountPermissions, { userId: user.id })
      ),
    });
  }, [accountPermissions, allUsers, editMode]);

  /*
   * Helpers
   */
  const nameForUser = (userId: string) => {
    if (userId === currentUser!.id)
      return `${currentUser!.fullName} (${t('user.you')})`;

    return find(allUsers, { id: userId })?.fullName || `unknown user ${userId}`;
  };

  const onPossibleUserSelected = (user: GqlFragmentBasicUserInfo) => {
    updateAccountPermission!(user.id, { userId: user.id, canEdit: false });
  };

  console.log('rendeeeer');

  /*
   * Ui parts
   */

  const selectOptions = () =>
    state.possibleUsers?.map((user, index) => (
      <Select.Option
        key={`account_permission_all_users_select_${user.id}`}
        value={user.id}
      >
        {user.fullName}
      </Select.Option>
    ));

  return (
    <>
      <Alert
        message={t('accountPermission.form.explanation.title')}
        description={t('accountPermission.form.explanation.body')}
        type="info"
        showIcon
        style={{ marginBottom: '5px' }}
      />
      {editMode && (
        <AllUsersSelector
          possibleUsers={state.possibleUsers}
          onUserSelected={onPossibleUserSelected}
          placeholder={t('accountPermission.form.selectUser')}
          selectSize="middle"
        />
      )}

      <Table
        columns={state.columnDefs}
        dataSource={state.dataSource}
        pagination={false}
      />
    </>
  );
};

export default AccountPermissionsForm;
