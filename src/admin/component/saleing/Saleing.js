import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { addsaleing, deletesaleing, editsaleing, getsaleing } from '../../../reduct/slice/saleing.slice';

function Saleing(props) {

    const dispatch = useDispatch()

    const saleing = useSelector(state => state.saleing)
    console.log(saleing);   

    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        dispatch(getsaleing());
    }, []);

    const handleClose = () => {
        setOpen(false);
        setupdate(false)
    };
    
    let saleingSchema = object({
        product: string().required(),
        price: number().required().positive().integer().min(1).max(100),
        expriy: date().required(),
    });

    const formik = useFormik({
        initialValues: {
            product: '',
            price: '',
            expriy: '',
            createdOn: new Date().toISOString().split('T')[0]
        },
        validationSchema: saleingSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                dispatch(editsaleing(values));
            } else {
                dispatch(addsaleing(values));
            }

            handleClose();
            resetForm();
        }

    })

    const columns = [
        { field: 'product', headerName: 'product Name', width: 130 },
        { field: 'price', headerName: 'price', width: 130 },
        { field: 'expriy', headerName: 'expriy', width: 130 },
        { field: 'createdOn', headerName: 'CreatedOn', width: 130 },
        {
            field: "remove",
            headerName: "Remove",
            width: 130,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(params.row.id)}
                >
                    Remove
                    <DeleteIcon />
                </Button>
            ),
        },
        {
            field: "edit",
            headerName: "Edit",
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleEdit(params.row)}
                >
                    Edit
                    <BorderColorIcon />
                </Button>
            ),
        },
    ];

    const handleRemove = (id) => {
        dispatch(deletesaleing(id));
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setupdate(true);
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

    return (
        <>
           <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>saleing Code</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="product"
                            name="product"
                            label="Enter product Name"
                            type="name"
                            fullWidth
                            variant="standard"
                            value={values.product}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.product && touched.product ? true : false}
                            helperText={errors.product && touched.product ? errors.product : ''}
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            name="price"
                            label="price"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.price && touched.price ? true : false}
                            helperText={errors.price && touched.price ? errors.price : ''}
                        />
                        <TextField
                            margin="dense"
                            id="expriy"
                            name="expriy"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={values.expriy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.expriy && touched.expriy ? true : false}
                            helperText={errors.expriy && touched.expriy ? errors.expriy : ''}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={saleing.saleing}
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

export default Saleing;