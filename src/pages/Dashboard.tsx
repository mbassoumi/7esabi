import React, {useState} from "react";
import {Collapse} from 'antd'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import './styles/dashboard.scss'
import EditGroupNameModal from "../components/EditGroupNameModal";
import AccountCard from "../components/AccountCard";
import Header from "../components/Header";
import {useTranslation} from "react-i18next";

const Dashboard = () => {
    const [editGroupNameModalVisible, setEditGroupNameModalVisible] = useState(false);
    const {t} = useTranslation();

    const getButtons = () => (
        <>
            <FontAwesomeIcon icon={faPencilAlt}
                             color="orange"
                             className="dashboard-page__icon-buttons"
                             onClick={event => {
                                 // If you don't want click extra trigger collapse, you can prevent this:
                                 // alert('edit');
                                 setEditGroupNameModalVisible(true);
                                 event.stopPropagation();
                             }}
            />
            <FontAwesomeIcon icon={faTrashAlt}
                             color="red"
                             className="dashboard-page__icon-buttons"
                             onClick={event => {
                                 // If you don't want click extra trigger collapse, you can prevent this:
                                 alert('delete');
                                 event.stopPropagation();
                             }}
            />
        </>
    );


    const onSaveGroupName = () => {
        setEditGroupNameModalVisible(false);
    }

    return (
        <div>
            <EditGroupNameModal onSave={onSaveGroupName} onCancel={() => setEditGroupNameModalVisible(false)}
                                visible={editGroupNameModalVisible}/>
            <Header title={t("dashboard.title")} actions={<FontAwesomeIcon icon={faPlus} color="white"/>}/>
            <Collapse
                defaultActiveKey={[1]}
                // onChange={callback}
            >
                <Collapse.Panel key={1} header="Group 1" extra={getButtons()}>
                    <AccountCard id={1} name="majd" amount={1235} currency="$" lastActivity="my last activity"/>
                    <AccountCard id={2} name="majd" amount={1235} currency="$" lastActivity="my last activity"/>
                </Collapse.Panel>
                <Collapse.Panel key={2} header="Group 2" extra={getButtons()}/>
            </Collapse>
        </div>
    )
}

export default Dashboard;