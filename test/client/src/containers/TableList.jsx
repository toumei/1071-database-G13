import React, { Component } from "react";
import List from "../components/List";
import apiRequest from "../api/apiRequest";

export default class TableList extends Component {
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
    /*apiRequest
      .get()
      .then(res => res.json())
      .then(res => {
        this.setState({ title: res.title });
        this.setState({ table: res.table });
        this.setState({ router: res.router });
        this.setState({
          data: { colName: res.data.colName, rows: res.data.rows }
        });
      })
      .catch(error => console.log(error));*/
  }
  componentWillUnmount() {}
  render() {
    return <List res={this.state} />;
  }
}
