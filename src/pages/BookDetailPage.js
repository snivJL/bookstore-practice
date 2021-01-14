import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

const BookDetailPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const { id } = useParams();
  console.log("COUCOU");
  useEffect(() => {
    if (!id) return;

    const fetchData = async (id) => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_BACKEND_API}/books/${id}`;
        console.log(url);

        const res = await fetch(url);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        setErrorMsg(`FETCH BOOK ERROR: ${error.message}`);
        console.log(errorMsg);
      }
      setLoading(false);
    };
    fetchData(id);
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Container>
          <Row>
            <Col xs={3}>
              <Card>
                <Card.Img variant="top" src={`/${book.imageLink}`} />
                <Card.Body>
                  <Card.Text>{book.title}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">{`@${book.author}`}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default BookDetailPage;
