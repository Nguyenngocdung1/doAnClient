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
            field
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
            books {
                id
                name
                des
                genre
                image
                field
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

const getUser = gql`
    query getUsersQuery {
        users {
            id
            name
            email
        }
    }
`

export { getBooks, getAuthors, getSingleBook, getUser, getSingleAuthor}