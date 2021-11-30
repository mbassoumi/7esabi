import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactComponentElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/header.scss';
import { Button } from 'antd';

interface HeaderProps {
  title: string;
  actions?: ReactComponentElement<any>;
}

const Header = ({ title, actions }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onHomeClick = (e: any) => {
    navigate('/', { replace: location.pathname === '/' });
  };

  return (
    <div className="header__container">
      <div className="header__section">
        <Button
          shape="circle"
          icon={<FontAwesomeIcon icon={faHome} color="white" />}
          onClick={onHomeClick}
          className="header__home-button"
        />
      </div>
      <div className="header__section">{title}</div>
      <div className="header__section">{actions}</div>
    </div>
  );
};

export default Header;
