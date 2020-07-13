import React, {ChangeEvent, useState} from "react";
import './styles/transactionForm.scss'
import {Button, Input, Switch, DatePicker} from "antd";
import {useTranslation} from "react-i18next";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import {RouteComponentProps} from "react-router-dom";

const TransactionForm = ({match}: RouteComponentProps) => {

    //@ts-ignore
    const id = match.params.id;
    console.log('selected TransactionForm id', id);

    const {t} = useTranslation();

    const [state, setState] = useState({
        type: true,
        amount: '',
        description: '',
        date: new Date(),
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const onTypeChange = () => {
        setState({
            ...state,
            type: !state.type
        })
    }

    const onSubmit = () => {
        alert(JSON.stringify(state));
    }

    return (
        <div>
            <Header title={t('addTransaction')}/>
            <div className="transaction-form__container">
                <div className="transaction-form__input__container">
                    <div className="transaction-form__input">
                        <Switch
                            onChange={onTypeChange}
                            checkedChildren={<span> <FontAwesomeIcon icon={faPlusCircle}/> {t('deposit')}</span>}
                            unCheckedChildren={<span>{t('withdraw')} <FontAwesomeIcon icon={faMinusCircle}
                                                                                      color="red"/></span>}
                            defaultChecked/>
                    </div>

                    <div className="transaction-form__input">
                        <Input type="number" name="amount" value={state.amount} onChange={onChange} size="large"
                               placeholder={t("amount")}/>
                    </div>

                    <div className="transaction-form__input">
                        <Input name="description" value={state.description} onChange={onChange} size="large"
                               placeholder={t("description")}/>
                    </div>

                    <div className="transaction-form__input">
                        <DatePicker allowClear={false} className="transaction-form__input__date" defaultValue={moment()}
                                    format='YYYY/MM/DD' placeholder={t('date')}/>
                    </div>

                    <div className="transaction-form__button__container">
                        <Button type="primary" onClick={onSubmit}
                                className="transaction-form__button">{t('save')}</Button>
                        <Button type="dashed" onClick={onSubmit}
                                className="transaction-form__button">{t('cancel')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionForm;