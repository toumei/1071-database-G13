import React, { PureComponent } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import {
  postCSVTableColumns,
  postCSVTableData
} from "../../../controllers/axios.controller";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
    document.title = "資料庫";
    this.curSelect = [];
  }

  componentDidMount() {
    postCSVTableColumns(this);
    postCSVTableData(this);
  }

  render() {
    if (this.state.columns.length > 0) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-11" style={{ marginTop: 10 }}>
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
                      <AllExportCSV {...props.csvProps} bind={this} />
                      <div className="col-md-1" />
                      <SelectExportCSV {...props.csvProps} />
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
  const handleClick = () => {
    const isSelect = props.bind.node.selectionContext.state;
    props.bind.curSelect = isSelect.selected;
    isSelect.selected = [];
    props.bind.state.data.filter((x, i) => {
      isSelect.selected.push(x.ID);
      return false;
    });
    props.onExport();
    isSelect.selected = props.bind.curSelect;
  };

  return (
    <div>
      <button className="btn btn-success" onClick={handleClick}>
        全部資料匯出成CSV
      </button>
    </div>
  );
};

const SelectExportCSV = props => {
  const handleClick = () => {
    props.onExport();
  };

  return (
    <div>
      <button className="btn btn-success" onClick={handleClick}>
        選取資料匯出成CSV
      </button>
    </div>
  );
};
