import React, { Component } from "react";
import { ApiDataCard } from "./ApiDataCard";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
class AllDataAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: null,
    };
  }

  renderData = () => {
    axios.get(`${process.env.REACT_APP_SERVER}/colors`).then((resultData) => {
      this.setState({
        colors: resultData.data.map((color, index) => {
          return (
            <ApiDataCard
              renderData={this.renderData}
              color={color}
              index={index}
              key={index}
              auth={this.props.auth0}
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
      <div>
        <h1>All Data from the API</h1>
        <h3>Select your favorites :)</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {this.state.colors}
        </div>
      </div>
    );
  }
}

export default withAuth0(AllDataAPI);
