import React from "react";
import './styles/languageSelector.scss'
import {Select} from 'antd';
import {useTranslation} from "react-i18next";


const LanguageSelector = () => {

    const {i18n} = useTranslation()

    const onChange = (selectedLanguage: string) => {
        i18n.changeLanguage(selectedLanguage)
    }

    return (
        <div className="language-selector__button">
            <Select defaultValue={i18n.language} style={{width: 120}} onChange={onChange}>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="ar">Arabic</Select.Option>
            </Select>
        </div>
    )
}
export default LanguageSelector;