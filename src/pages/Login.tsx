import React, {ChangeEvent, useState} from "react";
import {Input, Button} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons'
import './styles/login.scss'
import {useTranslation} from "react-i18next";


const Login = () => {
    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const {t} = useTranslation();
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmit = () => {
        alert(JSON.stringify(state))
    }

    return (
        <div className="login-page__container">
            <div className="login-page__form__container">
                <div className="login-page__form__logo">
                    {t("logo")}
                </div>
                <Input value={state.username} name="username" onChange={onChange} className="login-page__form__input"
                       size="large" placeholder={t("username")} prefix={<FontAwesomeIcon icon={faUser}/>}/>
                <Input.Password value={state.password} name="password" onChange={onChange}
                                className="login-page__form__input" size="large" placeholder={t('password')}
                                prefix={<FontAwesomeIcon icon={faKey}/>}/>
                <Button type="primary" onClick={onSubmit} className="login-page__form__button">{t('login')}</Button>
            </div>
        </div>
    )
}

export default Login