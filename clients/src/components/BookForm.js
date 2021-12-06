import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { getAllAuthors, getAllBooks } from '../graphql/queries';
import { addBook } from '../graphql/mutations';

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const onInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{ query: getAllBooks }],
    });

    setNewBook({
      name: '',
      genre: '',
      authorId: '',
    });
  };

  // GraphQL operations
  const { loading, error, data } = useQuery(getAllAuthors);

  const [createBook, dataMutation] = useMutation(addBook);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          value={newBook.name}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="genre"
          value={newBook.genre}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <Form.Control
            as="select"
            name="authorId"
            value={newBook.authorId}
            onChange={onInputChange}
          >
            <option value="" disabled>
              Select author
            </option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        )}
      </Form.Group>
      <Button variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default BookForm;
