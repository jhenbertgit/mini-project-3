import React, { Fragment, useState } from "react";

import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  DialogActions,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";

import ViewSales from "../components/ViewSales";
import SnackBar from "../components/UI/SnackBar";
import ModalDialog from "../components/UI/ModalDialog";
import { BASE_API_URL } from "../variable";

const api_url = `${BASE_API_URL}/sales`;

const Sales = () => {
  const [snackbar, setSnackbar] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const sales = {
      customer_name: data.get("customer-name"),
      date_of_sale: data.get("dos"),
    };

    try {
      const response = await fetch(api_url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(sales),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { msg } = await response.json();
      setSnackbar({
        children: msg,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
    }
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="md">
        <Grid item xs={6} sm={6}>
          <Button
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
            variant="contained"
            size="large"
          >
            Add to Cart
          </Button>
        </Grid>

        <Grid mt={3}>
          <ViewSales />
        </Grid>

        <ModalDialog
          title="Sales"
          btnLabel="Submit"
          open={openModal}
          onClose={handleCloseModal}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, mb: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="customer-name"
                  fullWidth
                  id="customer-name"
                  label="Customer's Name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="dos"
                  fullWidth
                  id="dos"
                  label="Date of Sale"
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" onClick={handleCloseModal} autoFocus>
                Submit
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </DialogActions>
          </Box>
        </ModalDialog>
        {!!snackbar && (
          <SnackBar
            onClose={handleCloseSnackbar}
            alertMsg={snackbar}
            alertOnClose={handleCloseSnackbar}
          />
        )}
      </Container>
    </Fragment>
  );
};

export default Sales;
