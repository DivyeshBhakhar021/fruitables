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

function Category(props) {
    const [data, setData] = useState([]);

    let userSchema = object({
        name: string().required().matches(/^[a-zA-Z'-\s]*$/),
        description: string().required().min(10, "least 10 characters"),
    });
    const Inu = Math.floor(Math.random() * 1000);

    const handaladd = (values) => {

        console.log(values);

        let localdata = JSON.parse(localStorage.getItem('category'));
        if(localdata){
            localdata.push({...values,id:Inu});
            localStorage.setItem("category",JSON.stringify(localdata))
        }else{
            localStorage.setItem("category",JSON.stringify([{...values,id:Inu}]))
        }
        getdata();
    }


    const getdata = () => {
        const categorygetdata = JSON.parse(localStorage.getItem('category'));
        if(categorygetdata){
            setData(categorygetdata)
        }
    }
    
    
    useEffect(() => {
        getdata();
    },[])
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            handaladd(values);
            formik.resetForm();
            handleClose();
        },
    });

    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = formik

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
    ];

    // const rows=categorygetdata.map((v,i)=>{

    //     return {
    //         id:i+1,
    //         name:v.name,
    //         description:v.description
    //     }
    // })

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
                                    <Button type="submit">Add</Button>
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