import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Fruits(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <>
      <div style={{ textAlign: 'end', marginRight:'50px' }}>
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Product
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleClose();
              },
            }}
          >

            <DialogTitle>Add The Product</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="text"
                label="name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="details"
                name="details"
                label="details"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="price"
                name="price"
                label="price"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="type"
                name="type"
                label="type"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
      <br /><br />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>

  );
}

export default Fruits;