import { Avatar, Button, Popover } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCachedCurrentUser } from '../helpers/storeHelper';
import './styles/userSessionMenu.scss';
import { logoutRequestApi } from '../../api/session';
import {
  showGenericOperationFailedMessage,
  userFullName,
  userInitials,
} from '../../utils/helpers';
import { queryClient } from '../../queryClient';

interface UserSessionMenuState {
  popoverVisible: boolean;
  logoutButtonLoading: boolean;
}

const UserSessionMenu = () => {
  const [state, setState] = useState<UserSessionMenuState>({
    popoverVisible: false,
    logoutButtonLoading: false,
  });

  const { t, i18n } = useTranslation();
  const currentUser = getCachedCurrentUser();

  // const [logoutFn, { client }] = useMutation<GqlLogout>(GQL_LOGOUT);

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
      await logoutRequestApi();
    } catch (e) {
      showGenericOperationFailedMessage(e, t);
      setLogoutButtonLoading(false);
      return;
    }

    // clear frontend store
    await queryClient.clear();

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
      title={`${t('generic.messages.welcome')} ${userFullName(currentUser)}`}
      trigger="click"
      placement={popoverPlacement}
      visible={state.popoverVisible}
      onVisibleChange={onPopoverVisibleChange}
      className="user-session-menu"
    >
      <Avatar className="user-session-menu__user-icon">
        {userInitials(currentUser) || 'U'}
      </Avatar>
    </Popover>
  );
};

export default UserSessionMenu;
