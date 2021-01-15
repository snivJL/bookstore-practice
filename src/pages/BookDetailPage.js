import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import "./bookdetailpage.css";

const BookDetailPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  console.log(isFavorite);

  const addToFavorite = async (e) => {
    if (!isFavorite) {
      //get selected book
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      };
      try {
        const url = `${process.env.REACT_APP_BACKEND_API}/favorites`;
        const res = await fetch(url, requestOptions);
        const data = await res.json();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(
        "URL",
        `${process.env.REACT_APP_BACKEND_API}/favorites/${id}`
      );
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/favorites/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async (id) => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_BACKEND_API}/books/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setBook(data);
        const urlFavorite = `${process.env.REACT_APP_BACKEND_API}/favorites/${id}`;

        const resFavorite = await fetch(urlFavorite);
        const dataFavorite = await resFavorite.json();
        console.log("DATA FAVORITE", dataFavorite);

        Object.keys(dataFavorite).length === 0
          ? setIsFavorite(false)
          : setIsFavorite(true);
      } catch (error) {
        setErrorMsg(`FETCH BOOK ERROR: ${error.message}`);
        console.log(errorMsg);
      }
      setLoading(false);
    };
    fetchData(id);
  }, [isFavorite]);
  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Container>
          <Card
            className="justify-content-md-center"
            style={{ width: "54rem" }}
          >
            <Row>
              <Col>
                <Card.Img
                  style={{ height: "32rem", width: "auto" }}
                  variant="top"
                  src={`/${book.imageLink}`}
                />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Text className="book-title">{book.title}</Card.Text>
                  <Card.Text>
                    <strong>Author: </strong>
                    {book.author}
                  </Card.Text>
                  <Card.Text>
                    <strong>Year: </strong>
                    {book.year}
                  </Card.Text>
                  <Card.Text>
                    <strong>Pages: </strong>
                    {book.pages}
                  </Card.Text>
                  <Card.Text>
                    <strong>Language: </strong>
                    {book.language}
                  </Card.Text>
                  <Card.Text>
                    <Button
                      variant="success"
                      id={book.id}
                      onClick={addToFavorite}
                    >
                      {!isFavorite ? "Add to favorite" : "Remove from favorite"}
                    </Button>{" "}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default BookDetailPage;
