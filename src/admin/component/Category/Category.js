import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

function Category(props) {
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(null);
    console.log(edit);

    let userSchema = object({
        name: string().required().matches(/^[a-zA-Z'-\s]*$/),
        description: string().required().min(10, "least 10 characters"),
    });
    const Inu = Math.floor(Math.random() * 1000);

    const handaladd = (values) => {

        console.log(values);

        let localdata = JSON.parse(localStorage.getItem('category'));
        if (localdata) {
            localdata.push({ ...values, id: Inu });
            localStorage.setItem("category", JSON.stringify(localdata))
        } else {
            localStorage.setItem("category", JSON.stringify([{ ...values, id: Inu }]))
        }
        getdata();
    }


    const getdata = () => {
        const categorygetdata = JSON.parse(localStorage.getItem('category'));
        if (categorygetdata) {
            setData(categorygetdata)
        }
    }
    const handleUpdate = (data) => {
        let localdata = JSON.parse(localStorage.getItem('category'));
        let index = localdata.findIndex(v => v.id === data.id)
        localdata[index] = data;
        localStorage.setItem("category", JSON.stringify(localdata))
        getdata();
    }


    useEffect(() => {
        getdata();
    }, [])
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: userSchema,
        onSubmit: values => {
            if (edit) {
                handleUpdate(values)
            } else {
                handaladd(values);
            }

            formik.resetForm();
            handleClose();

        },
    });

    const { handleChange, handleSubmit, onClick, handleBlur, values, touched, errors } = formik

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(null);

    };

    const handleDelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("category"));
        localData = localData.filter(v => v.id !== id);
        localStorage.setItem("category", JSON.stringify(localData));
        getdata();
    }
    const handleEdit = (data) => {
        console.log("abc", data);
        formik.setValues(data);
        setEdit(data);
        handleClickOpen();

    }


    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <IconButton aria-label="delete" size="large" variant="outlined"
                    onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),

        }, {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                    startIcon={<EditIcon color="success" />}
                >

                </Button>
            ),
        }

    ];


    return (
        <>
            <h1>Category</h1>
            <div style={{ textAlign: 'end', marginRight: '50px' }}>
                <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Product
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Add The Product</DialogTitle>
                            <DialogContent >
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
                                // helperText=""
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
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{edit ? "Update" : "Add"}</Button>
                            </DialogActions>


                        </form>

                    </Dialog>
                </React.Fragment>
            </div>
            <br /><br />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
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

export default Category;