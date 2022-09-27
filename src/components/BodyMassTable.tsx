import React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import BodyMassModel from "../model/BodyMass";
import { Button } from "@mui/material";

interface BodyMassTableProps {
  bodyMassList: BodyMassModel[];
  selectionModel: GridSelectionModel;
  onSelectionModelChange: (selectionModel: GridSelectionModel) => void;
  onDeleteButtonClick: () => void;
}

const BodyMassTable = (props: BodyMassTableProps): JSX.Element => {
  const cols: GridColDef[] = [
    { field: "created", headerName: "created", width: 150 },
    { field: "mass", headerName: "mass", width: 50, type: "number" },
  ];
  const rows = props.bodyMassList.map((bodyMass) => {
    return {
      id: bodyMass.id,
      created: bodyMass.created.toDate().toLocaleString(),
      mass: bodyMass.mass,
    };
  });
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={cols}
          checkboxSelection
          selectionModel={props.selectionModel}
          onSelectionModelChange={props.onSelectionModelChange}
        />
      </div>
      <Button
        variant="contained"
        color="error"
        onClick={props.onDeleteButtonClick}
      >
        delete selected rows
      </Button>
    </>
  );
};

export default BodyMassTable;
