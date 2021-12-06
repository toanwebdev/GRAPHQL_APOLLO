import { gql } from '@apollo/client';

const getAllBooks = gql`
  query getAllBooksQuery {
    books {
      id
      name
    }
  }
`;

const getBook = gql`
  query getBookQuery($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const getAllAuthors = gql`
  query getAllAuthorsQuery {
    authors {
      id
      name
    }
  }
`;

export { getAllBooks, getBook, getAllAuthors };
