import React, {ChangeEvent, useState} from "react";
import {Input, Modal} from "antd";
import {useTranslation} from "react-i18next";

interface EditGroupLabelModalProps {
    visible: boolean
    onSave: () => void,
    onCancel: () => void,
    value?: string
}
const EditGroupNameModal = ({onSave, onCancel, value, visible}: EditGroupLabelModalProps) => {
    const [state, setState] = useState(value);
    const {t} = useTranslation();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value)
    }

    return (
        <Modal
            title={t("EditGroupName")}
            visible={visible}
            okText={t("save")}
            cancelText={t("cancel")}
            onOk={onSave}
            onCancel={onCancel}
        >
            <Input value={state} onChange={onChange} size="large" placeholder={t("groupName")}/>
        </Modal>
    )
}

export default EditGroupNameModal;