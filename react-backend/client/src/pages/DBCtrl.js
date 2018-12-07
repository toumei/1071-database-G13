import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
// import DBColumn from './DBColumn';

function nameFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filterElement}
            {column.text}
            {sortElement}
        </div>
    );
}

// console.log(DBColumn);

class DBCtrl extends Component {
    state = {
        products: [],
        columns: [{
            dataField: 'studentID',
            text: '123',
            sort: true,
            filter: textFilter(),
            headerFormatter: nameFormatter
        },
        {
            dataField: 'name',
            text: '姓名',
            sort: true,
            filter: textFilter(),
            headerFormatter: nameFormatter
        }]
    }

    componentDidMount() {
        axios.get('http://localhost:3000/dbCtrl/List')
            .then(response => {
                this.setState({
                    products: response.data
                });
            });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    striped
                    hover
                    keyField='studentID'
                    data={this.state.products}
                    columns={this.state.columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()} />
            </div>
        );
    }
}

export default DBCtrl;