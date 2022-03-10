import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetails from "./BookDetails";

import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>error books!</p>;

  console.log(data);

  return (
    <Row>
      <Col xs={8}>
        <Card border="info" text="info" className="text-center shadow">
          <Card.Body>Ky nghe lay tay</Card.Body>
        </Card>
      </Col>
      <Col>
        <BookDetails />
      </Col>
    </Row>
  );
};

export default BookList;
