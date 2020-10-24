import { Select } from 'antd';
import { find, isEmpty } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GqlFragmentBasicUserInfo } from '../../graphql/gql/client-schema/types/GqlFragmentBasicUserInfo';
import { useCurrentUser } from '../helpers/storeHelper';
import './styles/allUsersSelector.scss';

interface AllUsersSelectorProps {
  possibleUsers: GqlFragmentBasicUserInfo[];
  onUserSelected: (user: GqlFragmentBasicUserInfo) => any;
  placeholder: string;
  selectSize?: 'small' | 'middle' | 'large';
}

const AllUsersSelector = ({
  possibleUsers,
  onUserSelected,
  placeholder,
  selectSize = 'middle',
}: AllUsersSelectorProps) => {
  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  /*
   * Helpers
   */
  const nameForUser = (userId: string) => {
    if (userId === currentUser!.id)
      return `${currentUser!.fullName} (${t('user.you')})`;

    return find(possibleUsers, { id: userId })!.fullName;
  };

  const onPossibleUserSelected = (userId: string) => {
    if (isEmpty(userId)) return;

    const selectedUser = find(possibleUsers, { id: userId });
    onUserSelected!(selectedUser!);
  };

  console.log('rendeeeer');

  /*
   * Ui parts
   */

  const selectOptions = () =>
    possibleUsers?.map((user, index) => (
      <Select.Option key={`all_users_select_${user.id}`} value={user.id}>
        {user.fullName}
      </Select.Option>
    ));

  return (
    <Select
      showSearch
      allowClear
      size={selectSize}
      className="all-users-selector"
      placeholder={placeholder}
      onSelect={onPossibleUserSelected}
      defaultActiveFirstOption={false}
      filterOption={(input, option) =>
        option?.children?.toLowerCase().indexOf(input) > 0
      }
    >
      {selectOptions()}
    </Select>
  );
};

export default AllUsersSelector;
