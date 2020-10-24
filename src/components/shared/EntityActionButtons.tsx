import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles/entityActionButtons.scss';

interface EntityActionButtonsProps<T> {
  ownerEntity: T;
  translationIndex: string;
  onEditButton?: ((entity: T) => any) | null;
  onDeleteButton?: ((entity: T) => any) | null;
  extraButtons?: any;
}

export const EntityActionButtons = <T,>({
  ownerEntity,
  translationIndex,
  onEditButton,
  onDeleteButton,
  extraButtons,
}: EntityActionButtonsProps<T>) => {
  const { t } = useTranslation();

  const onEditButtonClicked = (event: any) => {
    event.stopPropagation();
    onEditButton!(ownerEntity);
  };

  const onDeleteButtonClicked = (event: any) => {
    event.stopPropagation();
    onDeleteButton!(ownerEntity);
  };

  return (
    <div
      className="entity-action-buttons"
      onClick={(event) => event.stopPropagation()}
    >
      {extraButtons && extraButtons}
      {onEditButton && (
        <Tooltip
          placement="topLeft"
          title={t(`${translationIndex}.actions.edit`)}
          arrowPointAtCenter
        >
          <Button
            className="entity-action-buttons__button"
            onClick={onEditButtonClicked}
          >
            <FontAwesomeIcon icon={faPencilAlt} color="orange" />
          </Button>
        </Tooltip>
      )}
      {onDeleteButton && (
        <Tooltip
          placement="topLeft"
          title={t(`${translationIndex}.actions.delete`)}
          arrowPointAtCenter
        >
          <Button
            className="entity-action-buttons__button"
            onClick={onDeleteButtonClicked}
          >
            <FontAwesomeIcon icon={faTrashAlt} color="red" />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};
