import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button, Table } from 'antd';
import { drop, filter, find } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getCachedAllUsers,
  getCachedCurrentUser,
  getCachedUserInfo,
} from '../helpers/storeHelper';
import { User } from '../../@types/User';
import { userFullName } from '../../utils/helpers';
import AllUsersSelector from '../shared/AllUsersSelector';
import { AccountPermissionParams } from '../../api/account';

interface AccountPermissionsFormTableRecord {
  key: string;
  name: string;
  deleteAction: (event: any) => any;
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
];

interface AccountPermissionsFormProps {
  accountPermissionParamsList: AccountPermissionParams[];
  editMode?: boolean;
  createOrDeletePermission?: (
    accountPermissionParams: AccountPermissionParams,
    deleted?: boolean
  ) => void;
}

interface AccountPermissionsFormState {
  columnDefs: any[];
  dataSource: AccountPermissionsFormTableRecord[];
  possibleUsers: User[];
}

const AccountPermissionsForm = ({
  accountPermissionParamsList = [],
  createOrDeletePermission,
  editMode = false,
}: AccountPermissionsFormProps) => {
  const { t } = useTranslation();
  const allUsers = getCachedAllUsers();
  const currentUser = getCachedCurrentUser();

  const [state, setState] = useState<AccountPermissionsFormState>({
    columnDefs: columnDefs,
    dataSource: [],
    possibleUsers: [],
  });

  useEffect(() => {
    let adjustedColumnDefs: any = columnDefs;
    if (!editMode) {
      adjustedColumnDefs = drop(adjustedColumnDefs, 1); // drop the first column (the delete button)
    }
    // use translated names as we cannot use them inside the columns defs
    for (let i = 0; i < adjustedColumnDefs.length; i++) {
      if (adjustedColumnDefs[i].key === 'name') {
        adjustedColumnDefs[i]['title'] = t(
          'accountPermission.form.userNameColumn'
        );
      }
    }

    setState({
      columnDefs: adjustedColumnDefs,
      dataSource: accountPermissionParamsList.map(
        (accountPermissionParams) => ({
          key: `${accountPermissionParams.user_id}`,
          name: nameForUser(accountPermissionParams.user_id),
          deleteAction: (event: any) =>
            createOrDeletePermission!(accountPermissionParams, true),
          editMode,
        })
      ),
      possibleUsers:
        filter(
          allUsers,
          (user) =>
            user.id !== currentUser.id &&
            !find(accountPermissionParamsList, { user_id: user.id })
        ) || [],
    });
  }, [JSON.stringify(accountPermissionParamsList)]);

  /*
   * Helpers
   */
  const nameForUser = (userId: number) => {
    if (userId === currentUser.id)
      return `${userFullName(currentUser)} (${t('user.you')})`;

    const user = getCachedUserInfo(userId)!;
    return userFullName(user);
  };

  const onPossibleUserSelected = (user: User) => {
    createOrDeletePermission!({ user_id: user.id }, false);
  };

  /*
   * Ui parts
   */

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
