import { HeartOutlined, ShoppingOutlined, SwapOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography, Spin } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUserQuery } from '../../graphql-client/query';
import './header.css';
import { useQuery } from '@apollo/client';
const { Search } = Input;
interface Props {

}


const Header = (props: Props) => {
    const user: any = localStorage.getItem('user');
    const {email} = JSON.parse(user)
    const { loading, error, data } = useQuery(getUserQuery, {
        variables: {
            email: email,
        }
    })
    // console.log(data);

    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error book ...</p>
    }
    console.log(data);
    

    const onSearch = (value: string) => console.log(value);
    return (
        <div className="header">
            <Row style={{ padding: '30px 40px', alignItems: 'center' }}>
                <Col span={6}>
                    <Search
                        placeholder="Tìm kiếm"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                </Col>

                <Col span={12}>
                    <img width="200" src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/12/logo.png" alt="" />
                </Col>
                <Col span={2}>
                    <Row>
                        <Col span={6}>
                            <HeartOutlined />
                        </Col>
                        <Col span={18}>
                            <Typography.Text>
                                My Wishlist
                            </Typography.Text>
                        </Col>
                        <Col span={6}>
                            <SwapOutlined />
                        </Col>
                        <Col span={18}>
                            <Typography.Text style={{ textAlign: 'left' }}>
                                My Wishlist
                            </Typography.Text>
                        </Col>
                    </Row>

                </Col>
                <Col span={4}>
                    <Row>

                        <Col span={8}>
                            <ShoppingOutlined style={{ fontSize: '50px' }} />
                        </Col>
                        <Col span={16}>
                            <Typography.Title style={{ margin: 0 }} level={5}>
                                Giỏ hàng của bạn
                            </Typography.Title>
                            <Typography.Text >
                                Tổng tiền: 00.00$
                            </Typography.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ backgroundColor: 'black', justifyContent: 'center', padding: "0 40px"}}>
                <Col span={3} className="menu-item">
                    <NavLink  to="/" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            home
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/shop" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            shop
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/blog" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            BLOG
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/audiobooks" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            Audiobooks
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/chilren-books" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            Chilren’s books
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/usedbooks" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            Usedbooks
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/about-us" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            About Us
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/Contact Us" style={{color: 'white', display: 'block'}}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white'}} level={5} >
                            Contact Us
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
            </Row>
        </div>
    )
}

export default Header
