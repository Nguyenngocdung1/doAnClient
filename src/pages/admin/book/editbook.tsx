import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import '../../../common/firebase/index'
import {
    Button, Form,
    Input, Select, Space, Spin
} from 'antd';
import React, { useCallback, useState } from 'react';
import {updateSingleBook } from '../../../graphql-client/mutations';
import { getAuthors, getBooks, getSingleBook } from '../../../graphql-client/query';
import Uploadimage from '../uploadimage';
import './form.css';

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";
import { toastDefault } from '../../../common/toast';
import { useParams } from 'react-router-dom';
const { Option } = Select;
interface Props {

}

const Editbook: React.FC = (props: Props) => {
    const {slug} = useParams();
    const { loading: loading1, error: error1, data: data1} = useQuery(getSingleBook, {
        variables: {
            slug: slug,
        }
    })
    
    const navigate = useNavigate();
    const [add, Mutation] = useMutation<any>(updateSingleBook);
    const [imageFile, setImageFile] = useState<any>([]);
    const uploadImageState = useCallback((image) => {
        setImageFile(image)
    }, [])
    const { loading, error, data } = useQuery(getAuthors)
    if (loading || loading1) {
        return <Spin size="large" />
    }
    if (error || error1) {
        return <p>error authors ...</p>
    }
    
    const onFinish = async (values: any) => {
        let refField = [];
        if(data1.book.field){
            refField = JSON.parse(data1.book.field)
        }
        refField.push(values.field);
        values.field = JSON.stringify(refField)
        values.price = Number(values.price)
        values.slug = data1.book.slug
        
        const storage = getStorage();
        const uploadImagePromise = (image: any) => {
            return new Promise(function (resolve, reject) {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadBytes(storageRef, image).then(async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadUrl);
                });
            });
        };
        const listImageUrl: string[] = [];
        for (let i = 0; i < imageFile.length; i++) {
            await uploadImagePromise(imageFile[i].originFileObj).then((response: any) => {
                listImageUrl.push(response)
            });
        }
        values.image = JSON.stringify(listImageUrl);
        console.log(values);
        add(
            {
                variables: values,
                refetchQueries: [{ query: getBooks }]
            },
        )
    };

    console.log(data1);
    
    if (Mutation.loading) {
        return <Spin size="large" />
    }
    if (Mutation.data) {
        toastDefault('Thêm sách thành công')
        navigate('/admin/books')
    }
    // let refField = [];
    // if(data1.book.field){
    //     refField = JSON.parse(data1.book.field)
    // }
    return (
        <div>
            <Form style={{ overflow: 'auto' }} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.Item name="name" label="Tên sách" rules={[{ required: true, message: 'Bạn phải nhập Tên sách' }]}>
                    <Input defaultValue={data1.book.name} />
                </Form.Item>
                <Form.Item name="des" label="Mô tả" rules={[{ required: true, message: 'Bạn phải nhập mô tả sản phẩm' }]}>
                    <Input defaultValue={data1.book.des} />
                </Form.Item>
                <Form.Item name="price" label="Giá tiền" rules={[{ required: true, message: 'Bạn phải nhập giá tiền cho sản phẩm này' }]}>
                    <Input type="number" defaultValue={Number(data1.book.price)} />
                </Form.Item>
                <Form.Item name="genre" label="Thể loại chuyện" rules={[{ required: true, message: 'Bạn phải nhập thể loại truyện' }]}>
                    <Input defaultValue={data1.book.genre} />
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
                {/* {refField && refField.map((filed: any) => (
                        <Form.Item key={filed} name={filed.name} label={filed.name}>
                            <Input defaultValue={filed.value} />
                        </Form.Item>
                    ))
                } */}

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


export default Editbook