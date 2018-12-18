import React, { Component } from "react";

// controller
import { postTableList } from "../../controllers/axios.controller";
import { BootstrapDatabase } from "../../controllers/react-bootstrap.controller";
import { setDatabaseColumns } from "../../controllers/state.controller";

// default program
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: this.props.table,
      columns: setDatabaseColumns(this),
      data: []
    };
  }

  componentDidMount() {
    postTableList(this);
  }

  render() {
    return (
      <div className="col-md-2" style={{ marginTop: 10 }}>
        {BootstrapDatabase(this)}
      </div>
    );
  }
}
