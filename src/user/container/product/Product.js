import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addfacilities, deleteFacilities, editFacilities, getdata } from '../../../reduct/action/facilities_action';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Spinner } from 'reactstrap';
import { useEffect } from 'react';
import {  productdata } from '../../../reduct/action/Product.action';


export default function Product() {
    const [open, setOpen] = useState(false);
    const [update, setupdate] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(productdata())
    },[])

    const  product = useSelector((state) => state.product)
    console.log(product);
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteFacilities(id));
        console.log(id);
    }

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data);
        setupdate(true)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        setupdate(false)
    };

    let ProductSchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price:''
        },
        validationSchema: ProductSchema,
        onSubmit: (values, { resetForm }) => {
          
            resetForm()
            handleClose()
        },
    });

    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = formik;

    const columns = [
        { field: 'name', headerName: 'name', width: 70 },
        { field: 'description', headerName: 'description', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>

                    <IconButton
                        aria-label="delete"
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}

                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(params.row)}

                    >
                        <EditIcon />
                    </IconButton>

                </>
            ),
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
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Product
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}

                        >
                            <DialogTitle>Subscribe</DialogTitle>

                            <DialogContent>
                                <form onSubmit={handleSubmit}>
                                    <DialogContentText>
                                        To subscribe to this website, please enter your email address here. We
                                        will send updates occasionally.
                                    </DialogContentText>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name && touched.name ? true : false}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={errors.description && touched.description ? true : false}
                                        helperText={errors.description && touched.description ? errors.description : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="price"
                                        name="price"
                                        label="price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        error={errors.price && touched.price ? true : false}
                                        helperText={errors.price && touched.price ? errors.price : ''}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{update ? "update" : "Add"}</Button>
                                    </DialogActions>
                                </form>
                            </DialogContent>

                        </Dialog>
                        <div style={{ height: 400, width: '100%' }}>
                             <DataGrid
                                rows={product.product}
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
