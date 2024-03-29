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
import { addfacilities } from '../../../reduct/action/facilities_action';

export default function Facilities() {
    const [open, setOpen] = React.useState(false);

    const facilitiesredcer = useSelector(state => state.facilities)
    console.log(facilitiesredcer);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let facilitiesSchema = object({
        name: string().required(),
        description: string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',

        },
        validationSchema: facilitiesSchema,
        onSubmit: values => {
            console.log(values);
            dispatch(addfacilities(values))
        },
    });


    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = formik;


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Facilities
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
              
            >
                <DialogTitle>Subscribe</DialogTitle>

                <DialogContent>
        
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <form onSubmit={handleSubmit}>
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
                         </form>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                   
                </DialogContent>

            </Dialog>
        
        </>
    );
}
