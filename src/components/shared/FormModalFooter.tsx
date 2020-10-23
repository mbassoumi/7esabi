import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FormModalFooter {
  onSaveOrDeleteClick: (event: any) => any;
  onCancelClick: (event: any) => any;
  loading: boolean;
  disabled: boolean;
  isForDelete?: boolean;
}

function FormModalFooter({
  onSaveOrDeleteClick,
  onCancelClick,
  loading,
  disabled,
  isForDelete = false,
}: FormModalFooter) {
  const { t } = useTranslation();

  return (
    <>
      {[
        <Button key="back" onClick={onCancelClick}>
          {t('generic.actions.cancel')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSaveOrDeleteClick}
          disabled={disabled}
          danger={isForDelete}
        >
          {isForDelete
            ? t('generic.actions.criticalDelete')
            : t('generic.actions.save')}
        </Button>,
      ]}
    </>
  );
}

export default FormModalFooter;
