import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button, DatePicker, Form,
    Input, Space
} from 'antd';
import React from 'react';
interface Props {

}


const Addauthor: React.FC = (props: Props) => {
    const onFinish = (values:any) => {
        console.log('Received values of form:', values);
      };

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
                <Form.Item name="adress" label="Địa chỉ" rules={[{ required: true, message: 'Bạn phải nhập địa chỉ' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Bạn phải nhập số điện thoại' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="date" label="Năm sinh" rules={[{ required: true, message: 'Bạn phải nhập tuổi' }]}>
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

export default Addauthor