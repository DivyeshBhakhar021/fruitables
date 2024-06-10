import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { productContext } from '../../../context/reducer/salecontext';

function ProductsContext(props) {

  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(false);

  const ProductContext = useContext(productContext)
  console.log(ProductContext);

  const dispatch = useDispatch();

  useEffect(() => {
    ProductContext.getItem()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let productsSchema = object({
    name: string().required(),
    description: string().required(),
    price: number().required()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: ''
    },
    validationSchema: productsSchema,
    onSubmit: (values, { resetForm }) => {

      if (update) {
        ProductContext.editItem(values)
      } else {
        ProductContext.addItem(values)
      }

      resetForm();
      handleClose();
    },
  });

  const handleDelete = (id) => {
    ProductContext.deleteItem(id)

  }

  const handleEdit = (data) => {
    console.log(data);
    formik.setValues(data);
    setOpen(true);
    setUpdate(true);
    ProductContext.getItem();
  };


  const { handleSubmit, handleChange, handleBlur, errors, values, touched } = formik;

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)} >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)} >
            <EditIcon />
          </IconButton>
        </>
      )
    }
  ];


  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Products
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Products</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>

            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Products Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name ? errors.name : false}
              helperText={errors.name && touched.name ? errors.name : ''}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Products Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={errors.description && touched.description ? errors.name : false}
              helperText={errors.description && touched.description ? errors.description : ''}

            />
            <TextField
              margin="dense"
              id="price"
              name="price"
              label="Products Price"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              error={errors.price && touched.price ? errors.name : false}
              helperText={errors.price && touched.price ? errors.price : ''}

            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={ProductContext.products}
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

export default ProductsContext;