import { gql } from '@apollo/client';
const addSingleBook = gql`
    mutation CreateBook($name: String, $genre: String, $des: String, $image: String, $price: Int, $authorId: ID!){
        createBook(input: {name: $name, genre: $genre, des: $des, image: $image, authorId: $authorId, price: $price}){
            id
            name
        }
    }
`

const addSingleAuthor = gql`
    mutation addSingleAuthorMutation($name: String, $address: String, $phone: Int, $email: String){
        createAuthor(input: {
            name: $name,
            address: $address,
            phone: $phone,
            email: $email
        }){
            id
            name
        }
    }
`

const updateSingleAuthor = gql`
    mutation UpdateAuthor($id: ID!, $name: String, $address: String, $phone: Int, $email: String){
        updateAuthor(id: $id, input: {
            name: $name,
            address: $address,
            phone: $phone,
            email: $email
        }){
            id
            name
        }
    }
`

const deleteAuthor = gql`
    mutation DeleteAuthor($id: ID!){
        deleteAuthor(id: $id){
            name
        }
    }
`

const updateSingleBook = gql`
    mutation UpdateBook($id: ID!, $name: String, $genre: String, $des: String, $image: String, $price: Int, $authorId: ID!){
        updateBook(id: $id, input: {name: $name, genre: $genre, price: $price, authorId: $authorId, image: $image, des: $des}){
            id
            name
        }
    }
`

const deleteBook = gql`
    mutation DeleteBook($id: ID!){
        deleteBook(id: $id){
            name
        }
    }
`

const signIn = gql`
    mutation signInMutation($name: String, $password: String, $avatar: String, $email: String){
        createUser(input: {
            name: $name, email: $email, avatar: $avatar, password: $password
        }){
            id
            name
        }
    }
`


export { addSingleBook, addSingleAuthor, updateSingleBook, signIn, updateSingleAuthor, deleteAuthor, deleteBook }