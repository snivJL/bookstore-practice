import React from "react";
import { CardDeck, Card, Container, Col, Row } from "react-bootstrap";
import PaginationBar from "../components/PaginationBar";
import { Link } from "react-router-dom";

const BookList = ({ getPageNum, limit, totalPageNum, books }) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(books[0]),
  };
  const addToFavorite = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_API}/favorites`;
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <PaginationBar
          pageCount={totalPageNum}
          pageRangeDisplayed={limit}
          getPageNum={getPageNum}
        />
      </Row>
      <Row>
        <CardDeck>
          {books.map((book) => (
            <Col xs={3}>
              <Link to={`books/${book.id}`}>
                <Card>
                  <Card.Img variant="top" src={`/${book.imageLink}`} />
                  <Card.Body>
                    <Card.Text>{book.title}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">{`@${book.author}`}</small>
                    </Card.Text>
                    <button type="button" onClick={addToFavorite}>
                      Favorite
                    </button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </CardDeck>
      </Row>
    </Container>
  );
};

export default BookList;
