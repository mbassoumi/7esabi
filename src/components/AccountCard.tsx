import React from "react";
import './styles/accountCard.scss'

interface AccountCardProps {
    id: number,
    name: string,
    amount: number,
    currency: string,
    lastActivity: string
}

const AccountCard = ({id, name, amount, currency, lastActivity}: AccountCardProps) => {

    return (
        <div key={id} className="account-card__container">
            <div className="account-card__first-line">
                <div className="account-card account-card__account-name">{name}</div>
                <div>
                    <span className="account-card account-card__account-currency">{currency}</span>
                    <span className="account-card account-card__account-amount">{amount}</span>
                </div>
            </div>
            <div className="account-card__second-line">{lastActivity}</div>
        </div>
    )
}

export default AccountCard;