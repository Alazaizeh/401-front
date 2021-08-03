import axios from "axios";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Button } from "react-bootstrap";

export class ApiDataCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  addToFav = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/addFav?email=${this.props.auth.user.email}`,
        this.props.color
      )
      .then((resultData) => {});
  };

  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            alt={this.props.color.title}
            src={this.props.color.imageUrl}
          />
          <Card.Body>
            <Card.Title>{this.props.color.title}</Card.Title>
            <Button onClick={this.addToFav} variant="primary">
              Add to Favorites
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withAuth0(ApiDataCard);
