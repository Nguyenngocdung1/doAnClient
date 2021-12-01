import { gql } from '@apollo/client';
const addSingleBook = gql`
    mutation addSingleBookMutation($name: String, $genre: String, $des: String, $image: String, $price: Int, $authorId: ID!, $field: String){
        createBook(name: $name, genre: $genre, des: $des, image: $image, authorId: $authorId, price: $price, field: $field){
            id
            name
        }
    }
`

const addSingleAuthor = gql`
    mutation addSingleAuthorMutation($name: String, $address: String, $phone: String, $email: String, $field: String){
        createAuthor(name: $name, address: $address, phone: $phone, email: $email, field: $field){
            id
            name
        }
    }
`

const updateSingleBook = gql`
    mutation updateSingleBookMutation($id: ID!, $name: String, $genre: String, $des: String, $image: String, $price: Int, $authorId: ID!, $field: String){
        updateBook(id: $id, name: $name, genre: $genre, des: $des, image: $image, authorId: $authorId, price: $price, field: $field){
            id
            name
        }
    }
`


export {addSingleBook, addSingleAuthor, updateSingleBook}