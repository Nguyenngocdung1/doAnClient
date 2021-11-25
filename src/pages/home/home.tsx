import React from 'react'
import CarouselComponent from '../../components/carousel/Carousel';
import ProductComponent from '../../components/product/productComponent';

interface Props {
    
}

const Home = (props: Props) => {
    return (
        <div>
            <CarouselComponent />
            <ProductComponent />
        </div>
    )
}

export default Home
