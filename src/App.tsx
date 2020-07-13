import React from 'react';
import {ConfigProvider} from "antd";
import {useTranslation} from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";
import Routes from "./Routes";

const App = () => {
    const {i18n} = useTranslation()

    return (
        <ConfigProvider direction={i18n.dir()}>
            <div dir={i18n.dir()}>
                <Routes/>
                <LanguageSelector/>
            </div>
        </ConfigProvider>
    );
}

export default App;
