import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
    Button, Form,
    Input, Select, Space, Spin
} from 'antd';
import {
    getDownloadURL, getStorage,
    ref, uploadBytes, uploadBytesResumable
} from "firebase/storage";
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../common/firebase/index';
import { toastDefault } from '../../../common/toast';
import { addSingleBook } from '../../../graphql-client/mutations';
import { getAuthors, getBooks } from '../../../graphql-client/query';
import Uploadimage from '../uploadimage';
import './form.css';

const { Option } = Select;
interface Props {

}

const Addbook: React.FC = (props: Props) => {
    const navigate = useNavigate();
    const [add, Mutation] = useMutation<any>(addSingleBook);
    const [imageFile, setImageFile] = useState<any>([]);
    const uploadImageState = useCallback((image) => {
        setImageFile(image)
    }, [])
    const { loading, error, data } = useQuery(getAuthors)
    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error authors ...</p>
    }
    const onFinish = async(values: any) => {
        values.field = JSON.stringify(values.field)
        values.price = Number(values.price)
        
        const storage = getStorage();
        const uploadImagePromise = (image:any) => {
            return new Promise(function (resolve, reject) {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadBytes(storageRef, image).then(async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadUrl);
                });
            });
        };
        const listImageUrl: string[] =  [];
        for (let i = 0; i < imageFile.length; i++) {
            await uploadImagePromise(imageFile[i].originFileObj).then((response: any) => {
                listImageUrl.push(response)
            });
        }
        values.image = JSON.stringify(listImageUrl);
        add(
            {
                variables: values,
                refetchQueries: [{query: getBooks}]
            },
        )
    };
    if(Mutation.loading){
        return <Spin size="large" />
    }
    if(Mutation.data){
        toastDefault('Thêm sách thành công')
        navigate('/admin/books')
    }
    return (
        <div>
            <Form style={{ overflow: 'auto' }} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.Item name="name" label="Tên sách" rules={[{ required: true, message: 'Bạn phải nhập Tên sách' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="des" label="Mô tả" rules={[{ required: true, message: 'Bạn phải nhập mô tả sản phẩm' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Giá tiền" rules={[{ required: true, message: 'Bạn phải nhập giá tiền cho sản phẩm này' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="genre" label="Thể loại chuyện" rules={[{ required: true, message: 'Bạn phải nhập thể loại truyện' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Thêm ảnh">
                    <Uploadimage uploadImageState={uploadImageState} />
                </Form.Item>
                <Form.Item name="authorId" label="Tác giả" rules={[{ required: true, message: 'Bạn phải nhập thể loại truyện' }]}>
                    <Select defaultValue="lucy">
                        <Option value="lucy" disabled>Chọn tác giả</Option>
                        {data.authors.map((author: any) => (<Option key={author.id} value={author.id}>{author.name}</Option>))}
                    </Select>
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


export default Addbook