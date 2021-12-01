import React from 'react'
import { useParams } from 'react-router';

interface Props {
    
}

const AuthorPage = (props: Props) => {
    const {slugCate} = useParams();
    console.log("slugCategory", slugCate);
    
    return (
        <div>
            
        </div>
    )
}

export default AuthorPage
