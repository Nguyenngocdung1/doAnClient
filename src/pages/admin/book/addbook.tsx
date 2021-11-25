import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button, Form,
    Input, Space
} from 'antd';
interface Props {

}

export const Addbook = (props: Props) => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <div>
            <h2>Thêm sách</h2>
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.Item name="name" label="Tên sách" rules={[{ required: true, message: 'Bạn phải nhập Tên sách' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="des" label="Mô tả" rules={[{ required: true, message: 'Bạn phải nhập mô tả sản phẩm' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="genre" label="Thể loại chuyện" rules={[{ required: true, message: 'Bạn phải nhập thể loại truyện' }]}>
                    <Input />
                </Form.Item>
                <Form.List name="addfield">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        fieldKey={[fieldKey, 'name']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="Tên trường" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        fieldKey={[fieldKey, 'value']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Input placeholder="Value" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
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
