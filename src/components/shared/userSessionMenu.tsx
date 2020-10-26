import { useMutation } from '@apollo/client';
import { Avatar, Button, Popover } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GQL_LOGOUT } from '../../graphql/gql/auth/logout';
import { GqlLogout } from '../../graphql/gql/auth/types/GqlLogout';
import { showGenericOperationFailedMessage } from '../../graphql/utils/errorsHelper';
import { useCurrentUser } from '../helpers/storeHelper';
import './styles/userSessionMenu.scss';

interface UserSessionMenuState {
  popoverVisible: boolean;
  logoutButtonLoading: boolean;
}

const UserSessionMenu = () => {
  const [state, setState] = useState({
    popoverVisible: false,
    logoutButtonLoading: false,
  } as UserSessionMenuState);

  const { t, i18n } = useTranslation();
  const currentUser = useCurrentUser();

  const [logoutFn, { client }] = useMutation<GqlLogout>(GQL_LOGOUT);

  const onPopoverVisibleChange = (newValue: boolean) => {
    setState((state) => ({ ...state, popoverVisible: newValue }));
  };

  const setLogoutButtonLoading = (loading: boolean) => {
    setState((state) => ({
      ...state,
      logoutButtonLoading: loading,
    }));
  };

  const logout = async () => {
    console.log('logged out');

    setLogoutButtonLoading(true);

    // logout backend
    try {
      await logoutFn();
    } catch (e) {
      showGenericOperationFailedMessage(e, t);
      setLogoutButtonLoading(false);
      return;
    }

    // clear frontend store
    await client.clearStore();

    window.location.assign('/welcome');
  };

  const popoverContent = (
    <div>
      <Button
        loading={state.logoutButtonLoading}
        onClick={logout}
        type={'primary'}
      >
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
      onVisibleChange={onPopoverVisibleChange}
      className="user-session-menu"
    >
      <Avatar className="user-session-menu__user-icon">
        {currentUser?.initials || ''}
      </Avatar>
    </Popover>
  );
};

export default UserSessionMenu;
