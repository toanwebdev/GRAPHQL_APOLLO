import React from 'react';
import { Card } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import { getBook } from '../graphql/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBook, {
    variables: {
      id: bookId,
    },
    skip: bookId === null,
  });

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error loading book details!</p>;

  const book = bookId !== null ? data.book : null;

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        {book === null ? (
          <Card.Text>Please click a book</Card.Text>
        ) : (
          <>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle>{book.genre}</Card.Subtitle>
            <p>{book.author.name}</p>
            <p>Age: {book.author.age}</p>
            <p>All books by this author</p>
            <ul>
              {book.author.books.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
