import React from 'react'
import AboutComponent from './about/aboutComponent';
import Aboutfooter from './aboutfooter/aboutfooter';
import CarouselComponent from './carousel/Carousel';

import Footerhover from './footerhover/footerhover';
import ProductComponent from './product/productComponent';

interface Props {
    
}

const Home = (props: Props) => {
    return (
        <div>
            <CarouselComponent />
            <ProductComponent />
            <AboutComponent />
            <ProductComponent />
            <Footerhover />
            <Aboutfooter />
        </div>
    )
}

export default Home
