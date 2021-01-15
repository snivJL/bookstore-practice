import React from "react";
import { CardDeck, Card, Container, Col, Row } from "react-bootstrap";
import PaginationBar from "../components/PaginationBar";
import { Link } from "react-router-dom";

const BookList = ({ getPageNum, limit, totalPageNum, books }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <PaginationBar
          pageCount={totalPageNum}
          pageRangeDisplayed={limit}
          getPageNum={getPageNum}
        />
      </Row>
      <Row>
        <CardDeck style={{ width: "100%" }}>
          {books.map((book) => (
            <Col lg={3}>
              <Link to={`books/${book.id}`} books={books}>
                <Card>
                  <Card.Img variant="top" src={`/${book.imageLink}`} />
                  <Card.Body>
                    <Card.Text>{book.title}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">{`@${book.author}`}</small>
                    </Card.Text>
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
