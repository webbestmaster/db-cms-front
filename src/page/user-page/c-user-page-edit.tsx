import React, {useEffect} from 'react';
import {generatePath, useParams} from 'react-router-dom';
import {ExtractRouteParams} from 'react-router';
import {
    Button,
    Form,
    Input,
    Modal,
    Typography,
    Row,
    Select,
    Checkbox,
    notification,
    Switch,
    DatePicker,
    TimePicker,
} from 'antd';

import {appRoute} from '../../app-route';
import {useDocumentHook, useDocumentListHook} from '../../api/api-hook';
import {requiredFieldRule} from '../../util/form';

import {UserModelType} from './user-page-type';

export function UserPageEdit(): JSX.Element {
    const {userId} = useParams<ExtractRouteParams<typeof appRoute.userEdit.path, string>>();
    const [form] = Form.useForm();

    const {readDocumentById, updateDocument, isInProgress, result} = useDocumentHook<UserModelType>();

    useEffect(() => {
        readDocumentById('user-model', userId);
    }, [readDocumentById, userId]);

    function getUserData(): UserModelType {
        const login = form.getFieldValue('login') || '';
        const password = form.getFieldValue('password') || '';

        return {login, password, userId};
    }

    /*
        function onFormSubmit() {
            console.log('=============================');
            console.log(form.getFieldValue('title'));
            console.log('=============================');

            console.log('onFormSubmit - just button click', form);
        }
    */

    function onFinishSuccess() {
        console.log('onFinishSuccess - success', form);

        const userData = getUserData();

        updateDocument('user-model', userData)
            .then((data: UserModelType) => {
                console.log('updated - success');
                console.log(userData);
            })
            .catch((error: Error) => {
                console.log('error - success');
                console.error(error);
            });
    }

    function onFinishFailed() {
        console.log('onFormFinish - failed', form);
    }

    if (!result) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>User edit: {userId}</h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinishSuccess}
                onFinishFailed={onFinishFailed}
                // onSubmitCapture={onFormSubmit}
            >
                <Form.Item initialValue={result.login} label="User's login" name="login" rules={[requiredFieldRule]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    initialValue={result.password}
                    label="User's password"
                    name="password"
                    rules={[requiredFieldRule]}
                >
                    <Input/>
                </Form.Item>

                <Button htmlType="submit" type="primary">
                    Update
                </Button>
            </Form>
        </div>
    );
}
