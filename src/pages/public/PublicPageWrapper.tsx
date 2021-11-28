import React, { ComponentProps, FC } from 'react';
import './styles/publicPageWrapper.scss';
import LanguageSelector from '../../components/shared/LanguageSelector';

export interface PublicPageWrapperProps extends ComponentProps<any> {
  component: FC<any>;
}

const PublicPageWrapper = ({
  component: Component,
  ...rest
}: PublicPageWrapperProps) => {
  return (
    <>
      <div className="public-page-wrapper">
        {
          //@ts-ignore
          <Component {...rest} />
        }
      </div>
      <LanguageSelector />
    </>
  );
};

export default PublicPageWrapper;
