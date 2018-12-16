import React, { Component } from "react";
import { getTableList } from "../../controllers/axios.controller";
import { Bdatabase } from "../../controllers/bootstrap.controller";
import { databaseColumns } from "../../controllers/state.controller";

export default class DBDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.table,
      data: [],
      columns: databaseColumns(this)
    };
  }

  componentDidMount() {
    getTableList(this);
  }

  render() {
    return this.database();
  }

  database() {
    return (
      <div className="col-md-2" style={{ marginTop: 10 }}>
        {Bdatabase(this)}
      </div>
    );
  }
}
