import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";

class Jumbo extends Component {
  state = {};
  render() {
    return (
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6 order-last">
              <h1 style={{ color: "white" }}>Post Your Add Here</h1>
              <h6 style={{ color: "white" }}>Agrolanka</h6>
              <Button
                onClick={(event) => (window.location.href = "/postAdvertisement")}
                className="btn btn-warning mr-2 mt-1"
              >
                POST YOUR ADD
              </Button>
            </div>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

export default Jumbo;
