import React, { Component } from "react";

// controller
import { postTableListC } from "../../../controllers/axios.controller";
import { BootstrapDatabaseC } from "../../../controllers/react-bootstrap.controller";
import { DatabaseColumnsC } from "../../../controllers/state.controller";

// default program
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: this.props.table,
      columns: DatabaseColumnsC(this),
      data: []
    };
  }

  componentDidMount() {
    postTableListC(this);
  }

  render() {
    return (
      <div className="col-md-2" style={{ marginTop: 10 }}>
        {BootstrapDatabaseC(this)}
      </div>
    );
  }
}
