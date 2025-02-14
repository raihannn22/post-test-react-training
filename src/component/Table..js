import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

const Table = ({ columns, data }) => {
  return (
    <DataTable
      value={data}
      showGridlines
      paginator
      rows={5}
      responsiveLayout="scroll"
    >
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable
          body={col.body ? col.body : null}
        />
      ))}
    </DataTable>
  );
};

export default Table;
