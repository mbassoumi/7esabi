import { LoadingOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/languageSelector.scss';
import { LocaleCode } from '../../@types/enums';
import { getCachedCurrentUser } from '../helpers/storeHelper';
import { useMutation } from 'react-query';
import { updateUserApi } from '../../api/user';
import { showGenericOperationFailedMessage } from '../../utils/helpers';

interface LanguageSelectorProps {
  setLoading?: (loading: boolean) => any;
}

const getLocaleFromCode = (localeCode: LocaleCode) => {
  return localeCode?.toLowerCase();
};

const getCodeForLocale = (locale: string) => {
  return (LocaleCode as any)[locale.toUpperCase()];
};

const LanguageSelector = ({ setLoading }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const currentUser = getCachedCurrentUser();

  const updateUserMutation = useMutation((locale: LocaleCode) =>
    updateUserApi(currentUser.id, { locale })
  );

  useEffect(() => {
    const locale =
      currentUser?.locale || getCodeForLocale(i18n.language || 'en');
    setLocale(locale);
  }, [currentUser]);

  const setLocale = (localeCode: LocaleCode) => {
    i18n.changeLanguage(getLocaleFromCode(localeCode));
  };

  const onChange = async (selectedLocale: LocaleCode) => {
    if (currentUser) {
      try {
        if (setLoading) setLoading(true);

        await updateUserMutation.mutateAsync(selectedLocale);

        if (setLoading) setLoading(false);
      } catch (e) {
        showGenericOperationFailedMessage(e, t);
        if (setLoading) setLoading(false);
        return;
      }
    }
    setLocale(selectedLocale);
  };

  if (currentUser && updateUserMutation.isLoading) {
    return (
      <div className="language-selector__button">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <Select
      dropdownAlign="top"
      value={getCodeForLocale(i18n.language || 'en')}
      className="language-selector"
      onChange={onChange}
      getPopupContainer={(trigger) => trigger.parentNode}
    >
      <Select.Option value={LocaleCode.EN}>English</Select.Option>
      <Select.Option value={LocaleCode.AR}>Arabic</Select.Option>
    </Select>
  );
};
export default LanguageSelector;
