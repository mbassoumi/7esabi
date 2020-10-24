import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Select, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleCode, UserProfileInput } from '../../graphql/gql/globalTypes';
import { GqlUpdateUserProfile } from '../../graphql/gql/user/types/GqlUpdateUserProfile';
import { GQL_UPDATE_USER_PROFILE } from '../../graphql/gql/user/update';
import { showGenericOperationFailedMessage } from '../../graphql/utils/errorsHelper';
import { useCurrentUser } from '../helpers/storeHelper';
import './styles/languageSelector.scss';

interface LanguageSelectorProps {
  setLoading?: (loading: boolean) => any;
}

const getLocalFromCode = (localeCode: LocaleCode) => {
  return localeCode?.toLowerCase();
};

const getCodeForLocale = (locale: string) => {
  return (LocaleCode as any)[locale.toUpperCase()];
};

const LanguageSelector = ({ setLoading }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const currentUser = useCurrentUser();

  const [updateUserProfileFn, { loading }] = useMutation<GqlUpdateUserProfile>(
    GQL_UPDATE_USER_PROFILE
  );

  useEffect(() => {
    const locale =
      currentUser?.profile?.locale || getCodeForLocale(i18n.language || 'en');
    console.log('localeeeee', locale, currentUser);
    setLocale(locale);
  }, [currentUser]);

  const setLocale = (localeCode: LocaleCode) => {
    console.log('rrrrrrrr', localeCode, currentUser);
    i18n.changeLanguage(getLocalFromCode(localeCode));
  };

  const onChange = async (selectedLocale: LocaleCode) => {
    if (currentUser) {
      const userProfileInput: UserProfileInput = {
        id: currentUser.id,
        locale: selectedLocale,
      };

      try {
        if (setLoading) setLoading(true);

        await updateUserProfileFn({ variables: { data: userProfileInput } });

        if (setLoading) setLoading(false);
      } catch (e) {
        showGenericOperationFailedMessage(e, t);
        if (setLoading) setLoading(false);
        return;
      }
    }
    setLocale(selectedLocale);
  };

  if (currentUser && loading) {
    return (
      <div className="language-selector__button">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  console.log('i18n', i18n.language);
  return (
    <Select
      value={getCodeForLocale(i18n.language || 'en')}
      className="language-selector"
      onChange={onChange}
    >
      <Select.Option value={LocaleCode.EN}>English</Select.Option>
      <Select.Option value={LocaleCode.AR}>Arabic</Select.Option>
    </Select>
  );
};
export default LanguageSelector;
