import { gql } from '@apollo/client';

const addBook = gql`
  mutation addBookMutation($name: String, $genre: String, $authorId: ID!) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const addAuthor = gql`
  mutation addAuthorMutation($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

export { addBook, addAuthor };
