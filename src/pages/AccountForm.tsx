import React, {ChangeEvent, useState} from "react";
import './styles/accountForm.scss'
import {Button, Input, Select} from "antd";
import {useTranslation} from "react-i18next";
import CURRENCIES from "../api/currency";
import Header from "../components/Header";

const AccountForm = () => {
    const {t} = useTranslation();

    const [state, setState] = useState({
        group: '',
        name: '',
        currency: '',
        shared_with: '',
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const onCurrencySelect = (selectedCurrency: string) => {
        setState({
            ...state,
            currency: selectedCurrency
        })
    }

    const onSubmit = () => {
        alert(JSON.stringify(state));
    }

    return (
        <div>
            <Header title={t('createAccount')}/>
            <div className="account-form__container">
                <div className="account-form__input__container">
                    <div className="account-form__input">
                        <Input name="group" value={state.group} onChange={onChange} size="large"
                               placeholder={t("groupName")}/>
                    </div>
                    <div className="account-form__input">
                        <Input name="name" value={state.name} onChange={onChange} size="large"
                               placeholder={t("accountName")}/>
                    </div>
                    <div className="account-form__input">
                        <Select size="large" className="account-form__input__select" onChange={onCurrencySelect}
                                placeholder={t('selectCurrency')}>
                            {CURRENCIES.map((currency, index) => (
                                <Select.Option key={currency.key} value={currency.key}>
                                    <span className="">{currency.symbol}</span>
                                    <span className="account-form__input__select__option">
                                    {t(`currency.${currency.key}`)}
                                </span>
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="account-form__input">
                        <Input name="shared_with" value={state.shared_with} onChange={onChange} size="large"
                               placeholder={t("sharedWith")}/>
                    </div>
                    <div className="account-form__button__container">
                        <Button type="primary" onClick={onSubmit} className="account-form__button">{t('save')}</Button>
                        <Button type="dashed" onClick={onSubmit} className="account-form__button">{t('cancel')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountForm;