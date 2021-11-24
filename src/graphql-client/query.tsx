import {gql} from '@apollo/client'

const getBooks = gql`
    query getBooksQuery {
        books{
            name
            id
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
        }
    }
`

export { getBooks, getAuthors}