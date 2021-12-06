import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import BookDetails from './BookDetails';

import { useQuery } from '@apollo/client';
import { getAllBooks } from '../graphql/queries';

const BookList = () => {
  const [bookIdClicked, setBookIdClicked] = useState(null);

  const { loading, error, data } = useQuery(getAllBooks);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <Row>
      <Col xs={8}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: '20px',
          }}
        >
          {data.books.map((book) => (
            <Card
              border="info"
              text="info"
              className="text-center shadow"
              key={book.id}
              onClick={() => setBookIdClicked(book.id)}
            >
              <Card.Body>{book.name}</Card.Body>
            </Card>
          ))}
        </div>
      </Col>
      <Col>
        <BookDetails bookId={bookIdClicked} />
      </Col>
    </Row>
  );
};

export default BookList;
