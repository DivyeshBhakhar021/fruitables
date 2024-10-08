import   React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import { getSalespeopleData, handleAdd, handleRemove, handleUpdateData } from '../../../reduct/slice/salespeople.slice';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Salespeople() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);

    const dispatch = useDispatch();

    const Salespeopledata = useSelector(state => state.salespeople.Salespeople);
    console.log(Salespeopledata);

    useEffect(()=>{
        dispatch(getSalespeopleData());
    },[dispatch])

      const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(null)
        formik.resetForm();
    };

    const Salespeopleschema = object({
        sname: string().required('Name is required'),
        city: string().required('City is required'),
        comm: number().required('Commission is required'),
    })

    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: '',
        },
        validationSchema: Salespeopleschema,
        onSubmit: (values,{resetForm}) => {
            if (update) {
                dispatch(handleUpdateData(values))
            } else {
                dispatch(handleAdd(values));
            }
            console.log(values);
            handleClose();
            resetForm()
        },
    });

    const handleDelete = (snum) => {
        dispatch(handleRemove(snum));
    };

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);    
      };
    
    const columns = [
        { field: 'snum', headerName: 'ID', width: 70 },
        { field: 'sname', headerName: 'sname', width: 130 },
        { field: 'city', headerName: 'city', width: 130 },
        {
            field: 'comm',
            headerName: 'comm',
            type: 'number',
            width: 90,
        },{
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.snum)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        }
    ];

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

    const getRowId = (row) => row.snum;

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
            Salespeople
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="sname"
                            name="sname"
                            label="sname"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.sname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.sname && Boolean(errors.sname)}
                            helperText={touched.sname && errors.sname}
                        />
                        <TextField
                            margin="dense"
                            id="city"
                            name="city"
                            label="city"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                        />
                        <TextField
                            margin="dense"
                            id="comm"
                            name="comm"
                            label="comm"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={values.comm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.comm && Boolean(errors.comm)}
                            helperText={touched.comm && errors.comm}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? "Update" : "Add"}</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={Salespeopledata}
        columns={columns}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
        </React.Fragment>
    );
}
