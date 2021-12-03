import React, {useState} from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getSingleAuthor } from '../../graphql-client/query';
import './index.css'
import { useQuery } from '@apollo/client';
import { Spin, Button } from 'antd';
import formatprice from '../../common/formatprice';
import { getAuthors } from '../../graphql-client/query';
import author from '../admin/author/author';
interface Props {

}

const AuthorPage = (props: Props) => {
    const { slugCate } = useParams();

    const { loading, error, data } = useQuery(getSingleAuthor, {
        variables: {
            slug: slugCate,
        }
    })
    const [inputPrice, setInputPrice] = useState(0)
    const { loading: loading1, error: error1, data: data1 } = useQuery(getAuthors)
    if (loading || loading1) {
        return <Spin size="large" />
    }
    if (error || error1) {
        return <p>error authors ...</p>
    }

    const handleChangeInput = (e: any) => {
        setInputPrice(Number(e.target.value))
    }

    let dataFilter = data.author.books;
    if(inputPrice > 0){
        dataFilter = data.author.books.filter((data: any) => (inputPrice < data.price))
    }

    return (
        <div>
            <div className="container-fuild header-bottom">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="header-product-text">
                            <h1 className="page-header-title clr" itemProp="headline">
                                Simple Product 019
                            </h1>
                        </div>
                        <div className="d-flex header-product-a pt-2">
                            <div className="pe-1">
                                <Link to="/">Home |</Link>
                            </div>
                            <div className="pe-1">
                                <Link to="/">Product |</Link>
                            </div>
                            <div className="pe-1">
                                <span>{slugCate} |</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End header-Bottom */}
            <div className="container">
                <div className="d-flex">
                    <div className="row col-3">
                        <div className="d-grid">
                            <div className="a">
                                <div className="categories-title mt-5">
                                    <h3 style={{ textAlign: 'left' }}>Danh mục sách</h3>
                                </div>
                                {data1.authors.map((author: any) => (
                                    <div key={author.id} className="categories-name mt-3">
                                        <Link style={{ display: 'block', textAlign: 'left' }} to={'/' + author.slug}>{author.name}</Link>
                                    </div>
                                ))}

                            </div>
                            {/* End Category */}
                            <div className="Filter mt-5">
                                <h3 style={{ textAlign: 'left' }}>FILTER BY PRICE</h3>
                                <div className="column column-50 mt-3">
                                    <input onChange={handleChangeInput} value={inputPrice} type="range" id="rangeField" min={0} max={20000000} />
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-5">
                                    <span style={{ fontSize: '18px', display: 'block', textAlign: 'left' }}>
                                        Price: {formatprice(inputPrice)} - {formatprice(20000000)}
                                    </span>
                                </div>
                            </div>
                            <div className="banner-shop mt-5">
                                <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2020/05/banner-shop.jpg" alt="" />
                            </div>
                            <div className="compare mt-5">
                                <h5>COMPARE</h5>
                                <div>
                                    <span>No product to compare</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 ps-5">
                        <div className="d-flex justify-content-between mt-5 align-items-center border-bottom pb-3">
                            <div >
                                <i className="fas fa-list-ul text-warning pe-3" />
                                <span className="fw-bold text-center">VIEW: <span className="text-warning">12</span> / 24 / <span className="text-warning">ALL</span></span>
                            </div>
                            <div>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            {dataFilter.map((book: any) => (
                                <div key={book.id} className="row col-12 mt-5">
                                    {/* 1 sản phẩm */}

                                    <div className="col-4">
                                        <img src={JSON.parse(book.image)[0]} alt="" width="100%" />
                                    </div>
                                    <div className="col-8">
                                        <div className="mt-5">
                                            <h5 style={{ display: 'block', textAlign: 'left' }}>{book.name}</h5>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div id="rating" className="d-flex">
                                                <i style={{ display: 'block', textAlign: 'left' }} className="fa fa-star active" />
                                                <i style={{ display: 'block', textAlign: 'left' }} className="fa fa-star active" />
                                                <i style={{ display: 'block', textAlign: 'left' }} className="fa fa-star active" />
                                                <i style={{ display: 'block', textAlign: 'left' }} className="fa fa-star active" />
                                                <i style={{ display: 'block', textAlign: 'left' }} className="fa fa-star active" />
                                            </div>
                                        </div>
                                        <div className="price-detail mt-3">
                                            <span style={{ display: 'block', textAlign: 'left', fontSize: '20px' }} className="fw-bold">{formatprice(book.price)}</span>
                                        </div>
                                        <div className="description-detail mt-3">
                                            <span style={{ display: 'block', textAlign: 'left' }}>{book.des}</span>
                                        </div>
                                        <div className="addtocard-detail border-bottom mt-4 pb-2">
                                            <Link to={'/' + slugCate + "/" + book.slug}>
                                                <div className="d-flex ">
                                                    <p className="me-5"><Button type="primary">Xem chi tiết</Button> </p>
                                                    <div className="ms-5">
                                                        <i className="fas fa-exchange-alt pe-3" />
                                                        <i className="far fa-heart" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Kết thúc */}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorPage
