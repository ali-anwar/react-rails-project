import React from "react";
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { formatTimeDisplay } from '../../lib/timeConverter';

const DEFAULT_ROW_STYLE = {
  backgroundColor: ""
};

const getCaret = direction => {
  if (direction === "asc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-asc" aria-hidden="true" />
      </span>
    );
  }

  if (direction === "desc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-desc" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span>
      {" "}
      <i className="fa fa-sort" aria-hidden="true" />
    </span>
  );
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

const timeFormatter = (cell, row) => {
  return `${formatTimeDisplay(cell)}`
}

class MealList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "No data"
    };

    this.selectRowProp = {
      mode: "radio",
      onSelect: props.handleRowSelect,
      clickToSelect: true,
      hideSelectColumn: true
    };
  }

  rowStyleFormat = (row, rowIdx) => {
    if (!row || row.noCaloriesLimit) {
      return DEFAULT_ROW_STYLE;
    }
    return {
      backgroundColor: row.exceedsCaloriesLimit ? "#ff8c8c" : "#63de76"
    };
  };

  render() {
    let userNameRow = null;

    if(this.props.isCurrentAdminUser) {
      userNameRow = (
        <TableHeaderColumn
          dataField="userName"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          User Name
        </TableHeaderColumn>
      );
    }
    return (
      <BootstrapTable
        data={this.props.meals}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        trStyle={
          this.props.isCurrentAdminUser
            ? DEFAULT_ROW_STYLE
            : this.rowStyleFormat
        }
        className="custom-table"
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="text"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Text
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="no_of_calories"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Calories
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="date"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Date
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="time"
          dataSort={true}
          dataFormat={timeFormatter}
          caretRender={getCaret}
          columnTitle
        >
          Time
        </TableHeaderColumn>

        {userNameRow}

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

MealList.propTypes = {
  meals: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired,
  isCurrentAdminUser: PropTypes.bool.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
  handleEditButton: PropTypes.func.isRequired
};

export default MealList;
