import { useMutation, useQuery } from '@apollo/client';
import {
    Button, Form,
    Input, Select, Spin
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
import { getAuthors, getBooks, getGenres } from '../../../graphql-client/query';
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
    const { loading: loading1, error: error1, data: data1 } = useQuery(getGenres)
    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error authors ...</p>
    }
    const onFinish = async(values: any) => {
        values.price = Number(values.price)
        values.quantity = Number(values.quantity);
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
        debugger;
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
        toastDefault('Th??m s??ch th??nh c??ng')
        navigate('/admin/books')
    }
    return (
        <div>
            <Form style={{ overflow: 'auto' }} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.Item name="name" label="T??n s??ch" rules={[{ required: true, message: 'B???n ph???i nh???p T??n s??ch' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="des" label="M?? t???" rules={[{ required: true, message: 'B???n ph???i nh???p m?? t??? s???n ph???m' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Gi?? ti???n" rules={[{ required: true, message: 'B???n ph???i nh???p gi?? ti???n cho s???n ph???m n??y' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="genreId" label="Th??? lo???i chuy???n" rules={[{ required: true, message: 'B???n ph???i nh???p th??? lo???i truy???n' }]}>
                    <Select defaultValue="lucy">
                        <Option value="lucy" disabled>Ch???n th??? lo???i</Option>
                        {data1?.genres.map((genre: any) => (<Option key={genre.id} value={genre.id}>{genre.name}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item name="image" label="Th??m ???nh">
                    <Uploadimage imageData={''} uploadImageState={uploadImageState} />
                </Form.Item>
                <Form.Item name="quantity" label="Th??m s??? l?????ng">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="authorId" label="T??c gi???" rules={[{ required: true, message: 'B???n ph???i nh???p th??? lo???i truy???n' }]}>
                    <Select defaultValue="lucy">
                        <Option value="lucy" disabled>Ch???n t??c gi???</Option>
                        {data.authors.map((author: any) => (<Option key={author.id} value={author.id}>{author.name}</Option>))}
                    </Select>
                </Form.Item>
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