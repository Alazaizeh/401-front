import axios from "axios";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Button, Modal, Form } from "react-bootstrap";
export class FavCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  removeFav = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER}/removeFav/${this.props.index}?email=${this.props.auth0.user.email}`,
        this.props.color
      )
      .then((resultData) => {
        this.props.renderData();
      });
  };

  updateFav = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_SERVER}/updateFav/${this.props.index}?email=${this.props.auth0.user.email}`,
        { title: e.target.title.value, imageUrl: e.target.imageUrl.value }
      )
      .then((resultData) => {
        this.props.renderData();
        this.handleClose();
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.updateFav}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  defaultValue={this.props.color.title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Img Url</Form.Label>
                <Form.Control
                  name="imageUrl"
                  type="text"
                  defaultValue={this.props.color.imageUrl}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            alt={this.props.color.title}
            src={this.props.color.imageUrl}
          />
          <Card.Body>
            <Card.Title>{this.props.color.title}</Card.Title>
            <Button onClick={this.removeFav} variant="danger">
              Remove
            </Button>
            <Button onClick={this.handleShow} variant="info">
              Update
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withAuth0(FavCard);
