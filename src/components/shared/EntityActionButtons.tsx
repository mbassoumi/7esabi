import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import React from 'react';
import './styles/entityActionButtons.scss';
import { useTranslation } from 'react-i18next';
import { GQL_FRAGMENT_ACCOUNT_GROUP } from '../../graphql/gql/client-schema/fragments';

interface EntityActionButtonsProps<T> {
  ownerEntity: T;
  translationIndex: string;
  onEditButton?: ((entity: T) => any) | null;
  onDeleteButton?: ((entity: T) => any) | null;
}

export const EntityActionButtons = <T,>({
  ownerEntity,
  translationIndex,
  onEditButton,
  onDeleteButton,
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
