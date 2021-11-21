import { Select } from 'antd';
import { find, isEmpty } from 'lodash';
import React from 'react';
import './styles/allUsersSelector.scss';
import { User } from '../../@types/User';
import { userFullName } from '../../utils/helpers';

interface AllUsersSelectorProps {
  possibleUsers: User[];
  onUserSelected: (user: User) => any;
  placeholder: string;
  selectSize?: 'small' | 'middle' | 'large';
}

interface AllUsersSelectorState {
  selected: string;
}

const AllUsersSelector = ({
  possibleUsers,
  onUserSelected,
  placeholder,
  selectSize = 'middle',
}: AllUsersSelectorProps) => {
  /*
   * Helpers
   */

  const onPossibleUserSelected = (userId: string) => {
    if (isEmpty(userId)) return;

    const selectedUser = find(possibleUsers, (user) => `${user.id}` == userId);

    onUserSelected(selectedUser!);
  };

  /*
   * Ui parts
   */

  const selectOptions = () =>
    possibleUsers.map((user, index) => (
      <Select.Option key={`all_users_select_${user.id}`} value={`${user.id}`}>
        {userFullName(user)}
      </Select.Option>
    ));

  // hack to clear the select input field value after an option is selected
  const hackValue: any = null;
  return (
    <Select
      showSearch
      allowClear
      size={selectSize}
      className="all-users-selector"
      placeholder={placeholder}
      onChange={onPossibleUserSelected}
      value={hackValue}
      defaultActiveFirstOption={false}
      filterOption={(input, option) =>
        option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {selectOptions()}
    </Select>
  );
};

export default AllUsersSelector;
