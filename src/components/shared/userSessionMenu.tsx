import { useMutation } from '@apollo/client';
import { Avatar, Button, Popover } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GQL_LOGOUT } from '../../graphql/gql/auth/logout';
import { GqlLogout } from '../../graphql/gql/auth/types/GqlLogout';
import { showGenericOperationFailedMessage } from '../../graphql/utils/errorsHelper';
import { useCurrentUser } from '../helpers/storeHelper';

interface UserSessionMenuState {
  popoverVisible: boolean;
}

const UserSessionMenu = () => {
  const [state, setState] = useState({
    popoverVisible: false,
  } as UserSessionMenuState);

  const { t, i18n } = useTranslation();
  const currentUser = useCurrentUser();

  const [logoutFn, { client }] = useMutation<GqlLogout>(GQL_LOGOUT);

  const onPopoverVisibleChage = (newValue: boolean) => {
    setState((state) => ({ ...state, popoverVisible: newValue }));
  };

  const logout = async () => {
    console.log('logged out');

    // logout backend
    try {
      await logoutFn();
    } catch (e) {
      showGenericOperationFailedMessage(e, t);
      return;
    }

    // clear frontend store
    await client.clearStore();

    window.location.assign('/welcome');
  };

  const popoverContent = (
    <div>
      <Button onClick={logout} type={'primary'}>
        {t('generic.links.logout')}
      </Button>
    </div>
  );

  const localeDirection = i18n.dir();
  const popoverPlacement =
    localeDirection === 'rtl' ? 'bottomLeft' : 'bottomRight';
  return (
    <Popover
      content={popoverContent}
      title={`${t('generic.messages.welcome')} ${currentUser!.fullName}`}
      trigger="click"
      placement={popoverPlacement}
      visible={state.popoverVisible}
      onVisibleChange={onPopoverVisibleChage}
      className="user-session-menu"
    >
      <Avatar className="user-session-menu__user-icon">
        {currentUser?.initials || ''}
      </Avatar>
    </Popover>
  );
};

export default UserSessionMenu;
