import React, {ReactElement} from "react";
import './styles/transactionCard.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPencilAlt, faPlusCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

interface Currency {
    key: string,
    symbol: ReactElement
}

interface TransactionCardProps {
    id: number,
    date: Date,
    description: string,
    type: boolean,
    amount: number,
    by?: string
    currency: Currency
}

const TransactionCard = ({id, date, description, type, amount, by, currency}: TransactionCardProps) => {
    const {t} = useTranslation();

    const actionType = type ? <span style={{color: 'green'}}><FontAwesomeIcon icon={faPlusCircle}/> {t('deposit')}</span> :
        <span style={{color: 'red'}}><FontAwesomeIcon icon={faMinusCircle} color="red"/> {t('withdraw')} </span>;
    return (
        <div key={id} className="transaction-card__container">
            <div className="transaction-card__first-line">
                <div>
                    <span className="transaction-card transaction-card__transaction-currency">{currency.symbol}</span>
                    <span className="transaction-card transaction-card__transaction-amount">{amount}</span>
                </div>
                <div className=" transaction-card__transaction-name">{actionType}</div>
            </div>
            <div className="transaction-card__second-line">{date.toLocaleDateString()}</div>
            <div className="transaction-card__third-line">
                <div className="transaction-card__description">{description}</div>
                <div className="transaction-card__actions">
                    <Link to="/transaction/1/edit">
                        <FontAwesomeIcon className="transaction-card__actions__button" icon={faPencilAlt}/>
                    </Link>
                    <FontAwesomeIcon className="transaction-card__actions__button" icon={faTrashAlt}/>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard;