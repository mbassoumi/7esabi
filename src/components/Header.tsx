import React, {ReactComponentElement} from "react";
import './styles/header.scss'
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";


interface HeaderProps {
    title: string,
    actions?: ReactComponentElement<any>
}

const Header = ({title, actions}: HeaderProps) => {
    return (
        <div className="header__container">
            <div className="header__section">
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} color="white"/>
                </Link>
            </div>
            <div className="header__section">{title}</div>
            <div className="header__section">
                {actions}
            </div>
        </div>
    )
}

export default Header;