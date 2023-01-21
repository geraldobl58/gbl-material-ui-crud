import { useState } from "react";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import {
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  IconButton,
} from "@mui/material";

import { Delete } from "@mui/icons-material";

import { data } from "./mock";

export function App() {
  const [openSnack, setOpenSnack] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [customers, setCustomers] = useState<any[]>(data);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [fullName, setFullName] = useState("");

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (id: any) => (
        <>
          <IconButton onClick={() => handleDelete(id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleCloseSnack}>
        Desfazer
      </Button>
    </>
  );

  const handleDelete = (idData: any) => {
    handleClickSnack();
    setCustomers(customers.filter((user) => user.id !== idData.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: customers.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
      fullName: fullName,
    };
    setCustomers([...customers, newCustomer]);
  };

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message="Desfazer registro excluido."
        action={action}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={8}></Grid>

        <Grid item md={4}>
          <Button
            onClick={handleClickOpenModal}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add New Customer
          </Button>

          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add New Customer</DialogTitle>
            <form noValidate onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  autoFocus
                  margin="dense"
                  id="firstname"
                  label="Firstname"
                  type="text"
                  fullWidth
                />
                <TextField
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  margin="dense"
                  id="lastname"
                  label="Lastname"
                  type="text"
                  fullWidth
                />
                <TextField
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  margin="dense"
                  id="age"
                  label="Age"
                  type="text"
                  fullWidth
                />
                <TextField
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  margin="dense"
                  id="fullname"
                  label="Fullname"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleCloseModal}
                  color="primary"
                  type="submit"
                >
                  Add
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </Grid>
      <Box sx={{ height: 700, width: 980, margin: "20px auto" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick={true}
        />
      </Box>
    </>
  );
}
