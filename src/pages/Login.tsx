import React, {ChangeEvent, useState} from "react";
import {Input, Button} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons'
import './styles/login.scss'
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../api/auth/actions/authActions";
import {Redirect} from 'react-router-dom';


const Login = () => {

    const dispatch = useDispatch();

    //@ts-ignore
    const loggedInUser = useSelector(state => state.auth.user);

    console.log('Login user', loggedInUser);

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
        dispatch(loginAction({
            id: 1,
            username: state.username
        }));
    }

    return (
        <div className="login-page__container">
            {
                loggedInUser ? <Redirect to={{pathname: '/'}}/> : null
            }
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