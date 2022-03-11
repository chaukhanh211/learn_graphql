import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSignleBook } from "../graphql-client/mutations";

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { name, genre, authorId } = newBook;

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooks }],
    });

    setNewBook({ name: "", genre: "", authorId: "" });
  };

  const { loading, error, data } = useQuery(getAuthors);

  const [addBook, dataMutation] = useMutation(addSignleBook);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          onChange={onInputChange}
          value={name}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="genre"
          onChange={onInputChange}
          value={genre}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        {loading ? (
          <p>Loading author...</p>
        ) : (
          <Form.Control
            as="select"
            name="authorId"
            onChange={onInputChange}
            value={authorId}
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

      <Button className="float-right" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default BookForm;
