/* global File, HTMLInputElement */

import React, {useEffect, SyntheticEvent} from 'react';
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
import {useDocumentHook, useDocumentListHook, useFileHook} from '../../api/api-hook';
import {requiredFieldRule} from '../../util/form';
import {trim} from '../../util/string';

import {UserModelType} from './user-page-type';

export function UserPageEdit(): JSX.Element {
    const {userId} = useParams<ExtractRouteParams<typeof appRoute.userEdit.path, string>>();
    const [form] = Form.useForm();

    const {readDocumentById, updateDocument, isInProgress, result} = useDocumentHook<UserModelType>();
    const {uploadFile} = useFileHook();

    useEffect(() => {
        readDocumentById('user-model', userId);
    }, [readDocumentById, userId]);

    function getUserData(): UserModelType {
        const login = form.getFieldValue('login') || '';
        const password = form.getFieldValue('password') || '';
        const tagList = (form.getFieldValue('tag-list') || '').split(',').map(trim).filter(Boolean);
        const avatar = form.getFieldValue('avatar') || '';

        return {login, password, userId, tagList, avatar};
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

                <Form.Item
                    initialValue={result.tagList.join(', ')}
                    label="User's tag list, use ',' to separate"
                    name="tag-list"
                >
                    <Input/>
                </Form.Item>

                <div>
                    <Form.Item label="User's avatar" name="avatar">
                        <Input/>
                    </Form.Item>

                    <input
                        onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
                            const input = evt.currentTarget;
                            const {files} = input;

                            if (!files) {
                                return;
                            }

                            const [file] = files;

                            if (!file) {
                                return;
                            }

                            uploadFile(file)
                                .then((fileName: string) => {
                                    form.setFieldsValue({avatar: fileName});
                                })
                                .catch(console.error);
                        }}
                        type="file"
                    />

                    <img alt="" height="100" src={result.avatar} width="100"/>
                </div>

                <Button htmlType="submit" type="primary">
                    Update
                </Button>
            </Form>
        </div>
    );
}
