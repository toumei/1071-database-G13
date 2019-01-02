import React, { Component } from "react";
import Edit from "../components/Edit";

export default class TableEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      table: "",
      router: "",
      data: {
        colName: [],
        rows: []
      }
    };
  }
  componentDidMount() {
    fetch("/api" + window.location.pathname + window.location.search)
      .then(res => res.json())
      .then(res => {
        this.setState({ title: res.title });
        this.setState({ table: res.table });
        this.setState({ router: res.router });
        this.setState({
          data: { colName: res.data.colName, rows: res.data.rows }
        });
      })
      .catch(error => console.log(error.message));
  }
  componentWillUnmount() {}
  render() {
    return <Edit res={this.state} />;
  }
}
