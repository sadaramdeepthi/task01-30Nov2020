import React, { useState } from "react";
import "../../style/InputFields.scss";
import { Button, Form, Table } from "react-bootstrap";

const InputFields = () => {
  const [movieName, setmovieName] = useState("");
  const [movieRating, setmovieRating] = useState("");
  const [movieList, setmovieList] = useState([]);

  const onButtonClick = (e) => {
    e.preventDefault();

    setmovieList(
      movieList.concat({
        movieName: movieName,
        movieRating: movieRating,
      })
    );
  };

  return (
    <div className="inputfields-container">
      <Form>
        <Form.Group>
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type="text"
            id="movieName"
            name="movieName"
            placeholder="Enter movie name"
            onChange={(e) => setmovieName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Movie Rating</Form.Label>
          <Form.Control
            type="number"
            id="movieRating"
            name="movieRating"
            placeholder="Enter movie rating"
            onChange={(e) => setmovieRating(e.target.value)}
            min="1"
            max="10"
          />
          <Form.Text className="text-muted">
            Enter the rating maximum out of 10
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={onButtonClick} block>
          Submit
        </Button>
      </Form>
      <div className="table-container">
        <Table striped bordered hover>
          <tr>
            <th>S.No</th>
            <th>Movie Name</th>
            <th>Movie Rating</th>
          </tr>
          <tbody>
            {movieList.map((movie, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}.</td>
                  <td>{movie.movieName}</td>
                  <td>{movie.movieRating}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default InputFields;
