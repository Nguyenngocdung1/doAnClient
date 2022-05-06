import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getAuthors, getGenres, getBooks } from '../../graphql-client/query'
import { Avatar } from 'antd';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import formatprice from '../../common/formatprice';
import { List, Card, Spin, Pagination,Button, Col, Row, Typography, Empty    } from 'antd';

interface Props {
}

const Category = (props: Props) => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const { loading: loading1, error: error1, data: data1 } = useQuery(getAuthors);
    const { loading: loading2, error: error2, data: data2 } = useQuery(getGenres);
    const { loading: loading3, error: error3, data: data3 } = useQuery(getBooks);
    const [dataFilter, setDataFilter] = useState(data3?.books);

    if (loading1 || loading2 || loading3) {
        return <Spin size="large" />
    }
    if (error2 || error1 || error3) {
        return <p>error book ...</p>
    }

    const handlePage1 = (page1: any) => {
        setPage1(page1)
    }

    let dataFilter1 = data1?.authors;
    const dataPage1 = []
    if (dataFilter1 && ((3 * page1) <= dataFilter1.length)) {
        for (let i = 3 * (page1 - 1); i < 3 * page1; i++) {
            dataPage1.push(dataFilter1[i])
        }
    } else {
        for (let i = 3 * (page1 - 1); i < dataFilter1.length; i++) {
            dataPage1.push(dataFilter1[i])
        }
    }


    const handlePage2 = (page2: any) => {
        setPage2(page2)
    }
    let dataFilter2 = data2?.genres;
    const dataPage2 = []
    if (dataFilter2 && ((3 * page2) <= dataFilter2.length)) {
        for (let i = 3 * (page2 - 1); i < 3 * page2; i++) {
            dataPage2.push(dataFilter2[i])
        }
    } else {
        for (let i = 3 * (page2 - 1); i < dataFilter2.length; i++) {
            dataPage2.push(dataFilter2[i])
        }
    }

    const addGenreFilter = (idGenre: any) => {
        setDataFilter(data3?.books.filter((item: any) => item.genre.id === idGenre));
    }

    const addAuthorFilter = (idAuthor: any) => {
        setDataFilter(data3?.books.filter((item: any) => item.author.id === idAuthor))
    }

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
                    dataSource={dataPage1}
                    renderItem={(author: any) => (
                    <List.Item>
                        <Card title={author?.address}>
                            <Button onClick={() => addAuthorFilter(author.id)}>{author?.name}</Button>
                        </Card>
                    </List.Item>
                    )}
                />
                 <div className="pagination1" style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                    <Pagination onChange={handlePage1} pageSize={3} defaultCurrent={page1} total={dataFilter1.length} />
                </div>

                <div className="categories-title mt-5">
                    <h3 style={{ textAlign: 'left' }}>Thể loại</h3>
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
                    dataSource={dataPage2}
                    renderItem={(genres: any) => (
                    <List.Item>
                        <Card title={genres?.name}>
                            <Button onClick={() => addGenreFilter(genres.id)}>{genres?.name}</Button>
                        </Card>
                    </List.Item>
                    )}
                />
                 <div className="pagination2" style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                    <Pagination onChange={handlePage2} pageSize={3} defaultCurrent={page2} total={dataFilter2.length} />
                </div>

                <div className="categories-title mt-5">
                    <h3 style={{ textAlign: 'left' }}>Sách</h3>
                </div>
                <Col span={32}>
                    <Row>
                        {dataFilter?.length > 0 ? dataFilter?.map((book: any) => {
                            if(book?.id){
                                return (
                                    <Col key={book.id} span={6} style={{boxSizing: 'border-box'}}>
                                        <Link to={ "/" + book.author.slug + "/" + book.slug} className="mx-2">
                                            <img width="150" height="220" src={JSON.parse(book.image)} alt="" />
                                            <Typography.Title level={5} style={{margin: 0}}>
                                                {book.name}
                                            </Typography.Title>
                                            <Typography.Title level={4} style={{margin: 0}}>
                                                {formatprice(book.price)}
                                            </Typography.Title>
                                        </Link>
                                    </Col>
                                )
                            }
                            return null;
                        }) : (
                            <div style={{ padding: 10, border: "1px solid" , borderColor: '#ccc'}}> ----- Chưa có sách nào ------ <Empty /> </div>
                        )}
                    </Row>
                </Col>
            </div>
        </div>
    )
}

export default Category
