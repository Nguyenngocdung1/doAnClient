import React from 'react'
import { Row, Col, Typography } from 'antd';
import './footer.css';
interface Props {

}

const Footer = (props: Props) => {
    return (
        <div className="footer">
            <div className="footer-top">
                <Row style={{ width: '1200px', margin: '0 auto' }}>
                    <Col span={12}>
                        <Typography.Title level={3} className="text-footer-h3">
                            LATES TWEETS
                        </Typography.Title>
                        <Row>
                            <Col span={3} >
                                <div className="footer-icon-hover">
                                    <i className="fab fa-twitter"></i>
                                </div>
                            </Col>
                            <Col span={21}>
                                <Typography.Title level={5} className="footer-text-h5">Tên cửa hàng: Cửa hàng sách SkyBooks</Typography.Title>
                                <Typography.Title level={5} className="footer-text-h5">Địa chỉ: Số 83 Lý Nam Đế, Phường Cửa Đông, Hoàn Kiếm, Hà Nội</Typography.Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={3} className="text-footer-h3">
                            STAY CONNECTED
                        </Typography.Title>
                        <div className="footer-list-icon">
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-google-plus-g"></i>
                            </div>
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-facebook-f"></i>
                            </div>
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-youtube"></i>
                            </div>
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-telegram-plane"></i>
                            </div>

                            <div className="footer-list-icon-hover">
                                <i className="fab fa-instagram"></i>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer-bootom">
                <Row style={{ width: '1200px', margin: '0 auto' }}>
                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            INFORMATION
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>About Us</li>
                            <li>Delivery Information</li>
                            <li> Privacy & Policy</li>
                            <li>Terms & Conditions</li>
                            <li>Manufactures</li>
                        </ul>
                    </Col>

                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            OUR SERVICES
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>Orders Returns</li>
                            <li>Search Terms</li>
                            <li>Advanced Search</li>
                            <li>Affiliates</li>
                            <li>Wholesales</li>
                        </ul>
                    </Col>
                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            MY ACCOUNT
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>My Account</li>
                            <li>My Cart</li>
                            <li>Login</li>
                            <li>Wishlist</li>
                            <li>Perchases</li>
                        </ul>
                    </Col>
                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            LIÊN HỆ VỚI CHÚNG TÔI
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>Tên cửa hàng: Cửa hàng sách SkyBooks</li>
                            <li>Địa chỉ: Số 83 Lý Nam Đế, Phường Cửa Đông, Hoàn Kiếm, Hà Nội</li>
                            <li>Số điện thoại: 024 3843 8220</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer
