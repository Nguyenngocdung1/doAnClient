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
            price
            author {
                id
                name
                slug
            }
        }
    }
`

const getSingleBook = gql`
    query getSingleBookQuery($slug: String!){
        book(slug: $slug){
            id
            name
            des
            genre
            image
            slug
            price
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

const getSingleAuthor = gql`
    query getSingleAuthorQuery($slug: String!){
        author(slug: $slug){
            id
            name
            slug
            address
            phone
            email
            books {
                id
                name
                des
                genre
                image
                slug
                price
            }
        }
    }
`

const getAuthors = gql`
    query getAuthorsQuery {
        authors {
            id
            name
            address
            phone
            email
            slug
        }
    }
`

const getUsers = gql`
    query getUsersQuery {
        users {
            id
            name 
            email
            avatar
            role
        }
    }
`

const getUserQuery = gql`
    query User($email: String!) {
        user(email: $email) {
            id
            name
            email
            role
        }
    }
`

export { getBooks, getAuthors, getSingleBook, getUsers, getSingleAuthor, getUserQuery}