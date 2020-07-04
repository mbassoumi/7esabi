import React from "react";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import './styles/account.scss'
import AccountCard from "../components/AccountCard";
import TransactionCard from "../components/TransactionCard";
import CURRENCIES from "../api/currency";

const Account = () => {
    return (
        <div>
            <Header title="My Account" actions={<FontAwesomeIcon icon={faPencilAlt}/>}/>
            <div className="account-page__container">
                <div className="account-page__account-card-container">
                    <AccountCard id={1} name="My Account" amount={1234} currency="$" lastActivity="withdraw 10K"/>
                </div>
                <TransactionCard id={1} date={new Date()} description="dinner" type={true} amount={120} currency={CURRENCIES[0]}/>
                <TransactionCard id={2} date={new Date()} description="gamegamegam egame game gamegame gamega mega megam egamega megamegame" type={false} amount={90} currency={CURRENCIES[0]}/>
            </div>
        </div>
    )
}

export default Account;