import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyFavorites.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import FavCard from "./FavCard";

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: null,
    };
  }

  renderData = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/getFav?email=${this.props.auth0.user.email}`
      )
      .then((resultData) => {
        this.setState({
          colors: resultData.data.map((color, index) => {
            return (
              <FavCard
                renderData={this.renderData}
                color={color}
                index={index}
                key={index}
              />
            );
          }),
        });
      });
  };
  componentDidMount() {
    this.renderData();
  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>This is a collection of my favorites</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {this.state.colors}
        </div>
      </>
    );
  }
}

export default withAuth0(MyFavorites);
