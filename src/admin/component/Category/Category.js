import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategory, deleteCategory, updateCategory } from '../../../reduct/action/category.action'; 

function Category(props) {
    const [edit, setEdit] = useState(null);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.category);
    console.log("categories",categories);
    

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const userSchema = object({
        name: string().required('Name is required').matches(/^[a-zA-Z'-\s]*$/, 'Invalid characters'),
        description: string().required('Description is required').min(10, 'At least 10 characters'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            if (edit) {
                dispatch(updateCategory({ ...values, _id: edit }));
            } else {
                dispatch(addCategory(values));
            }
            formik.resetForm();
            handleClose();
        },
    });

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };

    const handleEdit = (row) => {
        formik.setValues(row);
        setEdit(row._id);
        handleClickOpen();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(null);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <>
            <h1>Category</h1>
            <div style={{ textAlign: 'end', marginRight: '50px' }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{edit ? 'Edit Category' : 'Add Category'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{edit ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
            <br /><br />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={categories}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row?._id} // Specify custom ID field
                />
            </div>
        </>
    );
}

export default Category;
