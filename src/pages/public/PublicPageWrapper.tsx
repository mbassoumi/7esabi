import React, { FC } from 'react';
import './styles/publicPageWrapper.scss';
import LanguageSelector from '../../components/shared/LanguageSelector';

export interface PublicPageWrapperProps {
  page: FC<any>;
}

const PublicPageWrapper = ({
  page: PageComponent, // rename to capital to be able to use it as a tag component <Component />
}: PublicPageWrapperProps) => {
  return (
    <>
      <div className="public-page-wrapper">
        {
          //@ts-ignore
          <PageComponent />
        }
      </div>
      <LanguageSelector />
    </>
  );
};

export default PublicPageWrapper;
