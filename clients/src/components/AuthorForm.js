import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { getAllAuthors } from '../graphql/queries';
import { addAuthor } from '../graphql/mutations';

const BookForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    age: '',
  });

  const { name, age } = newAuthor;

  const onInputChange = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createAuthor({
      variables: {
        name: name,
        age: parseInt(age),
      },
      refetchQueries: [{ query: getAllAuthors }],
    });

    setNewAuthor({
      name: '',
      age: '',
    });
  };

  // GraphQL operations
  const [createAuthor, dataMutation] = useMutation(addAuthor);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          value={name}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author age"
          name="age"
          value={age}
          onChange={onInputChange}
        />
      </Form.Group>
      <Button variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default BookForm;
