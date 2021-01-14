import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./searchform.css";

const Searchbox = ({ handleSearchFormSubmit, handleSearchInputChange }) => {
  return (
    <Container>
      <div id="title">
        <h1>Bookstore</h1>
      </div>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div id="searchArea">
            <input
              id="searchBox"
              onChange={handleSearchInputChange}
              type="text"
              placeholder="Search..."
            />
            <Button
              id="searchButton"
              variant="outline-success"
              onClick={handleSearchFormSubmit}
            >
              Search
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Searchbox;
