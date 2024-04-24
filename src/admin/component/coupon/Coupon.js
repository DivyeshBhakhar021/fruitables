
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
import { addCoupon, deleteCoupon, editCoupons, getCoupon, } from '../../../reduct/slice/coupon.slice';

const Coupon = () => {

    const dispatch = useDispatch()

    const coupon = useSelector(state => state.coupon)
    console.log(coupon);

    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setupdate(false)
    };

    useEffect(() => {
        dispatch(getCoupon());
    }, []);

    let couponSchema = object({
        coupon: string().required(),
        percentage: number().required().positive().integer().min(1).max(100),
        expriy: date().required(),
    });

    const formik = useFormik({
        initialValues: {
            coupon: '',
            percentage: '',
            expriy: '',
            createdOn: new Date().toISOString().split('T')[0]
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                dispatch(editCoupons(values));
            } else {
                dispatch(addCoupon(values));
            }

            handleClose();
            resetForm();
        }

    })

    const columns = [
        { field: 'coupon', headerName: 'Coupon Name', width: 130 },
        { field: 'percentage', headerName: 'Percentage', width: 130 },
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
        dispatch(deleteCoupon(id));
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setupdate(true);
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

    return (
        <>
            <h1>Coupon Page</h1>

            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Coupon Code</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="coupon"
                            name="coupon"
                            label="Enter Coupon Name"
                            type="name"
                            fullWidth
                            variant="standard"
                            value={values.coupon}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.coupon && touched.coupon ? true : false}
                            helperText={errors.coupon && touched.coupon ? errors.coupon : ''}
                        />
                        <TextField
                            margin="dense"
                            id="percentage"
                            name="percentage"
                            label="percentage"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={values.percentage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.percentage && touched.percentage ? true : false}
                            helperText={errors.percentage && touched.percentage ? errors.percentage : ''}
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
                    rows={coupon.coupon}
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
    )
}

export default Coupon
