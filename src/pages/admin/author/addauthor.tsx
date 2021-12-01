import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button, Form,
    Input, Space
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css'
import { useMutation } from '@apollo/client';
import { addSingleAuthor } from '../../../graphql-client/mutations';
import { getAuthors } from '../../../graphql-client/query';
import { Spin } from 'antd';
import { toastDefault } from '../../../common/toast';
interface Props {

}


const Addauthor: React.FC = (props: Props) => {
    const navigate = useNavigate();
    const [add, Mutation] = useMutation<any>(addSingleAuthor);
    const onFinish = (values: any) => {
        values.field = JSON.stringify(values.field)
        add(
            {
                variables: values,
                refetchQueries: [{ query: getAuthors }]
            },
        )
    };
    if (Mutation.loading) {
        return <Spin size="large" />
    }
    if (Mutation.data) {
        toastDefault('Thêm tác giả thành công')
        navigate('/admin/authors')
    }
    return (
        <div>
            <h2>Thêm tác giả</h2>
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.Item name="name" label="Tên tác giả" rules={[{ required: true, message: 'Bạn phải nhập tên tác giả' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Bạn phải nhập tên email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Bạn phải nhập địa chỉ' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Bạn phải nhập số điện thoại' }]}>
                    <Input type="tel" />
                </Form.Item>
                <Form.List name="field">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} align="baseline">
                                    <Form.Item
                                        style={{ width: '400px', height: '40px' }}
                                        {...restField}
                                        name={[name, 'name']}
                                        fieldKey={[fieldKey, 'name']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="Tên trường" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ width: '400px', height: '40px' }}
                                        {...restField}
                                        name={[name, 'value']}
                                        fieldKey={[fieldKey, 'value']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Input placeholder="Value" />
                                    </Form.Item>
                                    <MinusCircleOutlined style={{ lineHeight: '40px' }} onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Addauthor