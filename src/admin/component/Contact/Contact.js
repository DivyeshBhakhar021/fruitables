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
import { Contactcantext } from '../../../context/Contactcantext';

function Contact(props) {

    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const contact = useContext(Contactcantext)
    console.log(contact);


    useEffect(() => {
        contact.getContact()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let contactSchema = object({
        Address: string().required(),
        gmail: string().email().required(),
        Telephone: number().required()
    });

    const formik = useFormik({
        initialValues: {
            Address: '',
            gmail: '',
            Telephone: ''
        },
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                // ProductContext.editItem(values)
            } else {
                contact.addContext(values)
            }

            resetForm();
            handleClose();
        },
    });

    const handleDelete = (id) => {
        // ProductContext.deleteItem(id)

    }

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
        // ProductContext.getItem();
    };


    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = formik;

    const columns = [
        { field: 'Address', headerName: 'Address', width: 130 },
        { field: 'gmail', headerName: 'gmail', width: 130 },
        { field: 'Telephone', headerName: 'Telephone', width: 130 },
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
                            id="Address"
                            name="Address"
                            label="Enter your Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Address}
                            error={errors.Address && touched.Address ? errors.Address : false}
                            helperText={errors.Address && touched.Address ? errors.Address : ''}
                        />
                        <TextField
                            margin="dense"
                            id="gmail"
                            name="gmail"
                            label=" gmail"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gmail}
                            error={errors.gmail && touched.gmail ? errors.gmail : false}
                            helperText={errors.gmail && touched.gmail ? errors.gmail : ''}

                        />
                        <TextField
                            margin="dense"
                            id="Telephone"
                            name="Telephone"
                            label=" Telephone"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Telephone}
                            error={errors.Telephone && touched.Telephone ? errors.Telephone : false}
                            helperText={errors.Telephone && touched.Telephone ? errors.Telephone : ''}

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
                    rows={contact.contact}
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

export default Contact;
