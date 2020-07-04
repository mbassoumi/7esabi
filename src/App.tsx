import React, {useState} from 'react';
import Login from "./pages/Login";
import {ConfigProvider, Select} from "antd";
import {useTranslation} from "react-i18next";
import Dashboard from "./pages/Dashboard";
import LanguageSelector from "./components/LanguageSelector";
import AccountForm from "./pages/AccountForm";
import TransactionForm from "./pages/TransactionForm";
import Account from "./pages/Account";
import TransactionCard from "./components/TransactionCard";
import CURRENCIES from "./api/currency";

const App = () => {
    const {i18n} = useTranslation()
    const [state, setState] = useState(1);
    const renderComponent = (value: number) => {
        switch (value) {
            case 1:
                return <Login/>
            case 2:
                return <Dashboard/>
            case 3:
                return <Account/>
            case 4:
                return <AccountForm/>
            case 5:
                return <TransactionForm/>

        }
    }
    const onChange = (selected: number) => {
        setState(selected);
    }
    return (
        <ConfigProvider direction={i18n.dir()}>
            <div dir={i18n.dir()}>
                {renderComponent(state)}
                <div style={{position: 'fixed', bottom: 0, right: 0}}>
                    <Select defaultValue={1} style={{width: 120}} onChange={onChange}>
                        <Select.Option value={1}>Login</Select.Option>
                        <Select.Option value={2}>Dashboard</Select.Option>
                        <Select.Option value={3}>Account</Select.Option>
                        <Select.Option value={4}>Account Form</Select.Option>
                        <Select.Option value={5}>Transaction Form</Select.Option>
                    </Select>
                </div>
                <LanguageSelector/>
            </div>
        </ConfigProvider>
    );
}

export default App;
