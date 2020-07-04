import React, {ReactComponentElement} from "react";
import './styles/header.scss'
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface HeaderProps {
    title: string,
    actions?: ReactComponentElement<any>
}

const Header = ({title, actions}: HeaderProps) => {
    return (
        <div className="header__container">
            <div className="header__section">
                <FontAwesomeIcon icon={faHome} color="white"/>
            </div>
            <div className="header__section">{title}</div>
            <div className="header__section">
                {actions}
            </div>
        </div>
    )
}

export default Header;