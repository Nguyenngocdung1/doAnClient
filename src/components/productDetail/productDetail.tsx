import React from 'react'
import { Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { getSingleBook } from '../../graphql-client/query';
import { useParams } from 'react-router';

interface Props {
    
}

const ProductDetail = (props: Props) => {
    const {slugProduct} = useParams()
    
    const { loading, error, data } = useQuery(getSingleBook, {
        variables: {
            slug: slugProduct,
        }
    })
    console.log(data);

    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error book ...</p>
    }

    return (
        <div>
            
        </div>
    )
}

export default ProductDetail
