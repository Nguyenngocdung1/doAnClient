import React, { useRef, useState } from 'react'
import { Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { getSingleBook } from '../../graphql-client/query';
import { useParams } from 'react-router';
import './productDetail.css'
interface Props {

}

const ProductDetail = (props: Props) => {
    const { slugProduct } = useParams()
    const [count, setCount] = useState(1)
    const { loading, error, data } = useQuery(getSingleBook, {
        variables: {
            slug: slugProduct,
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
    const handleChange = (e: any) => {
        setCount(e.target.value)
    }
    const handleClickTang = () => {
        setCount(count + 1)
    }

    const handleClickGiam = () => {
        if(count > 1) {
            setCount(count - 1)
        }else{
            setCount(1)
        }
    }
    let images = [];
    if(data.book){
        images = JSON.parse(data.book.image)
    }
    console.log(images);
    
    return (
        <div>
            <div className="container-fuild header-bottom">
                <div className="container">
                    <div className="d-flex justify-content-between aligns-items-center">
                        <div className="header-product-text py-2">
                            <h1 className="page-header-title clr" style={{ color: 'black', marginBottom: 0 }} itemProp="headline">
                                {data.book.name}
                            </h1>
                        </div>
                        <div className="d-flex header-product-a" style={{ marginTop: "10px" }}>
                            <div className="pe-1">
                                <p >Home |</p>
                            </div>
                            <div className="pe-1">
                                <p >Product |</p>
                            </div>
                            <div className="pe-1">
                                <span>{data.book.name} |</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End header-Bottom */}
            <div className="container pt-5">
                <div className="row justify-content-start">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-5">
                                <div className="product-img">
                                    <img src={images[0]} alt="" width="100%" />
                                </div>
                                <div className="d-flex pt-2">
                                    <div className="img pe-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="100%" />
                                    </div>
                                    <div className="img pe-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="100%" />
                                    </div>
                                    <div className="img pe-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="100%" />
                                    </div>
                                    <div className="img">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="100%" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="product-title">
                                    <h1 style={{ color: 'black' }}>{data.book.name}</h1>
                                </div>
                                <div className="product-price">
                                    <span>$180.00</span>
                                </div>
                                <div className="product-description mt-3">
                                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                        diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                        aliquyam erat, sed diam voluptua.</span>
                                </div>
                                <div className="d-flex align-items-center baseline mt-5">
                                    <div className="num-block skin-6">
                                        <div className="num-in me-3 d-flex align-items-center">
                                            <span onClick={handleClickGiam} className="minus dis">-</span>
                                            <input onChange={handleChange} value={count} type="number" min="1" max="20" className="in-num num1234 form-control" />
                                            <span onClick={handleClickTang} className="plus">+</span> 
                                        </div>

                                    </div>
                                    <div className="button-addtocard">
                                        <button className="btn">ADD TO CARD</button>
                                    </div>
                                </div>
                                <div className="
                                        d-flex
                                        justify-content-start
                                        mt-3
                                        product-relate
                                        border-bottom
                                        pb-3
                                    ">
                                    <div className="Wistlist pe-4">
                                        <p ><i className="far fa-heart pe-2" />Wistlist</p>
                                    </div>
                                    <div className="Compare">
                                        <p ><i className="fas fa-list-ul pe-2" />Compare</p>
                                    </div>
                                </div>
                                <div className="product-description-content mt-3">
                                    <div>
                                        <span>SKU: WVN-02</span>
                                    </div>
                                    <div>
                                        <span>Category: <p >Category Name 01</p></span>
                                    </div>
                                    <div className="tag">
                                        <span>Tags: <p >Tag 0-1</p></span>
                                    </div>
                                </div>
                                <div className="icon mt-2">
                                    <div className="d-flex justify-content-start">
                                        <div className="facebook pe-2">
                                            <p ><i className="fab fa-facebook rounded-circle" /></p>
                                        </div>
                                        <div className="twitter pe-2">
                                            <p ><i className="fab fa-twitter-square" /></p>
                                        </div>
                                        <div className="gmail">
                                            <p ><i className="fas fa-envelope" /></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End content-product */}
                            <div className="container mt-5">
                                <div className="d-flex justify-content-evenly border-top pt-4">
                                    <div className="description">
                                        <p className="border-bottom border-4 border-warning">DESCRIPTION</p>
                                    </div>
                                    <div className="reviews">
                                        <p>REVIEWS</p>
                                    </div>
                                    <div className="aboutbrand">
                                        <p>ABOUT BRANDS</p>
                                    </div>
                                </div>
                                <div className="content-description">
                                    <div className=" mt-4">
                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor.
                                            Ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi.
                                            Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam erat mi, rutrum at sollicitudin rhoncus, ultricies posuere erat. Duis convallis, arcu nec aliquam consequat, purus felis vehicula felis, a dapibus enim lorem nec augue. Nunc facilisis sagittis ullamcorper.</span>
                                    </div>
                                </div>
                            </div>
                            {/* End Mô tả */}
                            <div className="container mt-5">
                                <div className="relateProduct-content text-center">
                                    <h1>RELATED PRODUCTS</h1>
                                </div>
                                <div className="d-flex mt-5">
                                    <div className="row justify-content-between">
                                        <div className=" col-3 product-relate-content">
                                            <div className="text-center">
                                                <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="80%" />
                                            </div>
                                            <div className="fw-bold">
                                                <p >Downloadable Product 001</p>
                                            </div>
                                            <div className="d-flex justify-content-between"><div className="ratings text-center">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                                <div className="price fw-bold text-center">
                                                    <p >$290,00</p>
                                                </div></div>
                                        </div>
                                        <div className=" col-3 product-relate-content">
                                            <div className="text-center">
                                                <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="80%" />
                                            </div>
                                            <div className="fw-bold">
                                                <p >Downloadable Product 001</p>
                                            </div>
                                            <div className="d-flex justify-content-between"><div className="ratings text-center">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                                <div className="price fw-bold text-center">
                                                    <p >$290,00</p>
                                                </div></div>
                                        </div>
                                        <div className=" col-3 product-relate-content">
                                            <div className="text-center">
                                                <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="80%" />
                                            </div>
                                            <div className="fw-bold">
                                                <p style={{ color: 'black' }}>Downloadable Product 001</p>
                                            </div>
                                            <div className="d-flex justify-content-between"><div className="ratings text-center">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                                <div className="price fw-bold text-center">
                                                    <p >$290,00</p>
                                                </div></div>
                                        </div>
                                        <div className=" col-3 product-relate-content">
                                            <div className="text-center">
                                                <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="80%" />
                                            </div>
                                            <div className="fw-bold">
                                                <p >Downloadable Product 001</p>
                                            </div>
                                            <div className="d-flex justify-content-between"><div className="ratings text-center">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                                <div className="price fw-bold text-center">
                                                    <p >$290,00</p>
                                                </div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End sản phẩm liên quan */}
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="top-rate">
                            <div className="top-rate-title">
                                <h5>TOP RATED PRODUCTS</h5>
                            </div>
                            <div className="d-grid justify-content-between">
                                <div className="row">
                                    <div className="d-flex col-12 mt-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="40%" />
                                        <div className="fw-bold">
                                            <p >Downloadable Product 001</p>
                                            <div className="ratings ">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                            <div className="price fw-bold ">
                                                <p >$290,00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex col-12 mt-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="40%" />
                                        <div className="fw-bold">
                                            <p >Downloadable Product 001</p>
                                            <div className="ratings ">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                            <div className="price fw-bold ">
                                                <p >$290,00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex col-12 mt-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="40%" />
                                        <div className="fw-bold">
                                            <p >Downloadable Product 001</p>
                                            <div className="ratings ">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                            <div className="price fw-bold ">
                                                <p >$290,00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex col-12 mt-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="40%" />
                                        <div className="fw-bold">
                                            <p >Downloadable Product 001</p>
                                            <div className="ratings ">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                            <div className="price fw-bold ">
                                                <p >$290,00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex col-12 mt-3">
                                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/05/product-3-1.jpg" alt="" width="40%" />
                                        <div className="fw-bold">
                                            <p >Downloadable Product 001</p>
                                            <div className="ratings ">
                                                <p><i className="rate fa fa-star" /></p>
                                                <p title="2/5"><i className="rate rated fa fa-star" /></p>
                                                <p title="3/5"><i className="rate fa fa-star" /></p>
                                                <p title="4/5"><i className="rate fa fa-star" /></p>
                                                <p title="5/5"><i className="rate fa fa-star" /></p>
                                            </div>
                                            <div className="price fw-bold ">
                                                <p >$290,00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Sản phẩm nổi bật */}
                                <div className=" mt-4">
                                    <h4>COMPARE</h4>
                                    <div>
                                        <span>No products to compare</span>
                                    </div>
                                    <div className="d-flex mt-2">
                                        <div className="justify-content-center pe-5">
                                            <p >Clear all</p>
                                        </div>
                                        <div>
                                            <button className="btn btn-dark">COMPARE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetail
