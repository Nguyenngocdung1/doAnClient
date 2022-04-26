import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { getAuthors } from '../../graphql-client/query'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { List, Card } from 'antd';

interface Props {
}

const Category = (props: Props) => {
    const { loading: loading1, error: error1, data: data1 } = useQuery(getAuthors);
    debugger;
    return (
        <div>
            <div className="container">
                <div className="categories-title mt-5">
                    <h3 style={{ textAlign: 'left' }}>Tác giả</h3>
                </div>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={data1?.authors}
                    renderItem={(author: any) => (
                    <List.Item>
                        <Avatar shape="square" size={64} icon={<UserOutlined />} />
                        <Card title={author?.name}>{author?.address}</Card>
                    </List.Item>
                    )}
                />
                <div className="categories-title mt-5">
                    <h3 style={{ textAlign: 'left' }}>Tác giả</h3>
                </div>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={data1?.authors}
                    renderItem={(author: any) => (
                    <List.Item>
                        <Avatar shape="square" size={64} icon={<UserOutlined />} />
                        <Card title={author?.name}>{author?.address}</Card>
                    </List.Item>
                    )}
                />
                </div>
            </div>
    )
}

export default Category
