import React, { Component } from "react";

// bootstrap
import ToolkitProvider from "react-bootstrap-table2-toolkit";

// model
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

// controller
import {
  postCSVData,
  postCSVColumns,
  handleAllExport,
  handleSelectExport
} from "../../../controllers/CSV.controller";

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { columns: [], data: [], isSelect: [] };
    document.title = "資料庫";
  }

  componentDidMount() {
    postCSVColumns(this);
    postCSVData(this);
  }

  render() {
    if (this.state.columns.length > 0) {
      return (
        <div className="height-full container-fluid opacity animation-one" style={{ backgroundColor: "white" }}>
          <div className="row justify-content-md-center" style={{ marginTop: "10px" }}>
            <div className="col-md-11">
              <ToolkitProvider
                keyField="ID"
                columns={this.state.columns}
                data={this.state.data}
                exportCSV={{
                  fileName: "報修系統.csv",
                  onlyExportSelection: true,
                  exportAll: true
                }}
              >
                {props => (
                  <div>
                    <div className="row justify-content-md-center">
                      <div className="col-5 col-md-1">
                        <AllExportCSV {...props.csvProps} bind={this} />
                      </div>
                      <div className="col-1 col-md-1" />
                      <div className="col-5 col-md-1">
                        <SelectExportCSV {...props.csvProps} />
                      </div>
                    </div>
                    <hr />
                    <CustomBootstrap
                      base={{ ...props.baseProps }}
                      selectRow={{ mode: "checkbox", clickToSelect: true }}
                      pagination={this.state.data.length === 0 ? false : true}
                      refs={n => (this.node = n)}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

const AllExportCSV = props => {
  return (
    <div>
      <Fab
        className="btn btn-success"
        onClick={() => {
          handleAllExport(props);
        }}
        variant="extended"
        color="primary"
        aria-label="Add" >
        <NavigationIcon />
        全部資料匯出成CSV
      </Fab>
    </div>
  );
};

const SelectExportCSV = props => {
  return (
    <div>
      <Fab
        className="btn btn-success"
        onClick={() => {
          handleSelectExport(props);
        }}
        variant="extended"
        color="primary"
        aria-label="Add" >
        <NavigationIcon />
        選取資料匯出成CSV
      </Fab>
    </div>
  );
};
