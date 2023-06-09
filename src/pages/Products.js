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

import ViewProducts from "../components/ViewProducts";
import SnackBar from "../components/UI/SnackBar";
import ModalDialog from "../components/UI/ModalDialog";
import { BASE_API_URL } from "../variable";

const api_url = `${BASE_API_URL}/products`;

const Products = () => {
  const [snackbar, setSnackbar] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const product = {
      code: data.get("products"),
      description: data.get("description"),
      unit_price: data.get("price"),
    };
    try {
      const response = await fetch(api_url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(product),
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
            Add Products
          </Button>
        </Grid>

        <Grid mt={3}>
          <ViewProducts />
        </Grid>

        <ModalDialog
          title="Products"
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
                  name="products"
                  fullWidth
                  id="products"
                  label="Product Code"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="description"
                  fullWidth
                  id="description"
                  label="Description"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="price"
                  fullWidth
                  id="price"
                  label="Price"
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

export default Products;
