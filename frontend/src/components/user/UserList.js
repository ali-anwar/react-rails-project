import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';

const getCaret = direction => {
  if (direction === 'asc') {
    return (
      <span>
        {' '}
        <i className="fa fa-sort-asc" aria-hidden="true" />
      </span>
    );
  }

  if (direction === 'desc') {
    return (
      <span>
        {' '}
        <i className="fa fa-sort-desc" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span>
      {' '}
      <i className="fa fa-sort" aria-hidden="true" />
    </span>
  );
};

const roleFormatter = (cell, row) => {
  return `${_.startCase(_.toLower(cell))}`;
};

const buttonFormatter = (cell, row, props) => {
  return (
    <div>
      <button
        className="btn btn-warning mr-2"
        onClick={() => props.handleEditButton(row.id)}
      >
        <i className="fa fa-pencil" aria-hidden="true" />
      </button>

      <button
        className="btn btn-danger"
        onClick={() => props.handleDeleteButton(row.id)}
      >
        <i className="fa fa-trash" aria-hidden="true" />
      </button>
    </div>
  );
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: 'No data'
    };

    this.selectRowProp = {
      mode: 'radio',
      onSelect: props.handleRowSelect,
      clickToSelect: true,
      hideSelectColumn: true
    };
  }

  render() {
    return (
      <BootstrapTable
        data={this.props.users}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        className="custom-table"
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="name"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Name
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="email"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Email
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="role"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
          dataFormat={roleFormatter}
        >
          Role
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="button"
          dataFormat={buttonFormatter}
          formatExtraData={this.props}
        >
          Actions
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
  handleEditButton: PropTypes.func.isRequired
};

export default UserList;
