import {gql} from '@apollo/client'

const getBooks = gql`
    query getBooksQuery {
        books{
            name
            id
            des
            genre
            image
            slug
            author {
                name
                slug
            }
        }
    }
`

const getSingleBook = gql`
    query getSingleBookQuery($id: ID!){
        book(id: $id){
            id
            name
            des
            genre
            image
            field
            slug
            author {
                id
                name
                books{
                    id
                    name
                    slug
                }
            }
        }
    }
`

const getAuthors = gql`
    query getAuthorsQuery {
        authors {
            id
            name
            age
            address
            phone
            email
            slug
        }
    }
`

export { getBooks, getAuthors, getSingleBook}