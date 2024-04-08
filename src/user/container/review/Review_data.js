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
import { addPoduct, addaddPoduct, deleteproduct, editdata, productdata } from '../../../reduct/action/Product.action';


export default function Product() {
    const [open, setOpen] = useState(false);
    const [update, setupdate] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productdata())
    }, [])

    const review = useSelector((state) => state.review)
    console.log(review);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteproduct(id));
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

    let reviewtSchema = object({
        pid: string().required(),
        name: string().required(),
        email: string().required(),
        price: number().required(),
        review: number().required(),
        rating: number().required()
    });

    const formik = useFormik({
        initialValues: {
            pid: '',
            name: '',
            email: '',
            price: '',
            review: '',
            rating: ''
        },
        validationSchema: reviewtSchema,
        onSubmit: (values, { resetForm }) => {
            //   if (update) {
            //     dispatch(editdata(values))
            //   } else{
            //     dispatch(addPoduct(values))
            //   }
            resetForm()
            handleClose()
        },
    });

    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'details', headerName: 'Details', width: 130 },
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
                            id="pid"
                            name="pid"
                            label="pid"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pid}
                            error={errors.pid && touched.pid ? true : false}
                            helperText={errors.pid && touched.pid ? errors.pid : ''}
                        />
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
                            id="email"
                            name="email"
                            label="email"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email && touched.email ? true : false}
                            helperText={errors.email && touched.email ? errors.email : ''}
                        />
                        <TextField
                            margin="dense"
                            id="review"
                            name="review"
                            label="review"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.review}
                            error={errors.review && touched.review ? true : false}
                            helperText={errors.review && touched.review ? errors.review : ''}
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
                        <TextField
                            margin="dense"
                            id="rating"
                            name="rating"
                            label="rating"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rating}
                            error={errors.rating && touched.rating ? true : false}
                            helperText={errors.rating && touched.rating ? errors.rating : ''}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? "update" : "Add"}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                {/* <DataGrid
                                rows={product.product}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />  */}
            </div>
        </>

    );
}
