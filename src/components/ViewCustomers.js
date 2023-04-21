import React, { Fragment, useState, useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import LoadingLinear from "./LoadingLinear";
import NoRowsOverlay from "./NoRowsOverlay";
import SnackBar from "./SnackBar";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const api_url = "http://localhost:5000/api/v1/mp-3/customers";

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${api_url}`);
      if (!response.ok) {
        throw new Error("Something went wrong in server.");
      }
      const data = await response.json();
      const customerObj = data.map((customerData) => {
        return {
          id: customerData.customer_id,
          firstname: customerData.firstname,
          lastname: customerData.lastname,
          address: customerData.address,
          city: customerData.city,
          zip: customerData.zip,
          email: customerData.email,
          phone: customerData.phone,
        };
      });
      setCustomers(customerObj);
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const updateCustomer = useCallback(async (id, customer) => {
    setIsLoading(true);
    setError(null);
    try {
      await fetch(`${api_url}/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
    }
    setIsLoading(false);
  }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    customers.filter((row) => row.id !== id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = customers.find((row) => row.id === id);
    if (editedRow.isNew) {
      customers.filter((row) => row.id !== id);
    }
  };

  const processRowUpdate = useCallback(
    async (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      await updateCustomer(updatedRow.id, {
        firstname: updatedRow.firstname,
        lastname: updatedRow.lastname,
        address: updatedRow.address,
        city: updatedRow.city,
        zip: updatedRow.zip,
        email: updatedRow.email,
        phone: updatedRow.phone,
      });
      setCustomers(
        customers.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
      setSnackbar({
        children: "Customer successfully saved",
        severity: "success",
      });
      return updatedRow;
    },
    [updateCustomer, customers]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstname",
      headerName: "First name",
      width: 120,
      editable: true,
    },
    { field: "lastname", headerName: "Last name", width: 120, editable: true },
    { field: "address", headerName: "Address", width: 120, editable: true },
    { field: "zip", headerName: "Zip", width: 120, editable: true },
    { field: "city", headerName: "City", width: 120, editable: true },
    { field: "email", headerName: "Email", width: 120, editable: true },
    { field: "phone", headerName: "Phone", width: 120, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  let content = <NoRowsOverlay />;

  if (customers.length > 0) {
    content = (
      <>
        <DataGrid
          rows={customers}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        {!!snackbar && (
          <SnackBar
            onClose={handleCloseSnackbar}
            alertMsg={snackbar}
            alertOnClose={handleCloseSnackbar}
          />
        )}
      </>
    );
  }

  if (error) {
    content = setSnackbar({ children: error.message, severity: "error" });
  }

  if (isLoading) {
    content = <LoadingLinear />;
  }

  return <Box sx={{ height: 400, width: "100%" }}>{content}</Box>;
};

export default ViewCustomers;
