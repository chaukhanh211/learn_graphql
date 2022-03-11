import { gql } from "@apollo/client";

const addSignleBook = gql`
  mutation addSignleBookMutation(
    $name: String
    $genre: String
    $authorId: ID!
  ) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const addSingleAuthor = gql`
  mutation addSignleAuthor($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      age
      name
    }
  }
`;

export { addSignleBook, addSingleAuthor };
