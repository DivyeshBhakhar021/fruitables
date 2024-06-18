import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number, mixed } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addPoduct, deleteproduct, productdata, editdata } from '../../../reduct/action/Product.action';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Spinner } from 'reactstrap';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getCategory } from '../../../reduct/action/category.action';
import { getsubcategory } from '../../../reduct/slice/subcategory.slice';

function Products(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const [data, setData] = useState([]);


    const dispatch = useDispatch();

    const products = useSelector(state => state.product);
    const subcategories = useSelector(state => state.subcategory.subcategory);
    const categories = useSelector(state => state.category.category);



    console.log(categories);

    useEffect(() => {
        dispatch(productdata());
        dispatch(getCategory());
        dispatch(getsubcategory());
    }, [dispatch]);

    useEffect(() => {
        if (products.product) {
            setData(products.product);
        }
    }, [products]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    const handleDelete = (_id) => {
        dispatch(deleteproduct(_id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(data._id);
    };

    const columns = [
        {
            field: 'pro_img', headerName: 'Products Image', width: 160,
            renderCell: (params) => (
                // console.log(params.row)
                <img src={params.row.pro_img.url} width="50" height="50" />
            )
        },
        {
            field: 'categoriesid', headerName: 'Category', width: 150,
            renderCell: (params) => {

                const categoryData = categories.find(v => v._id === params.row.categoriesid);
                return categoryData ? categoryData.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: 'Subcategory Name', width: 160,
            renderCell: (params) => {
                const subcategoryData = subcategories.find(v => v._id === params.row.subcategory_id);
                return subcategoryData ? subcategoryData.name : '';
            }
        },
        { field: 'name', headerName: 'Products Name', width: 160 },
        { field: 'description', headerName: 'Products Description', width: 160 },
        { field: 'price', headerName: 'Products Price', width: 160 },
        { field: 'stock', headerName: 'Products Stock', width: 160 },
        {
            field: 'action', headerName: 'Action', width: 160,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },


    ];

    let productSchema = object({
        categoriesid: string().required("Please select category"),
        subcategory_id: string().required("Please select subcategory"),
        name: string().required("Please enter name"),
        description: string().required("Please enter description"),
        price: number().required("Please enter price"),
        stock: number().required("Please enter stock"),
        pro_img: mixed().required("Please upload image")
            .test("fileSize", "The file is too large", (value) => {
                console.log(value);
                if (value?.size) {
                    return value.size <= 2 * 1024 * 1024;
                }
                return true
            })
            .test("fileType", "The file type is not supported", (value) => {
                console.log(value);
                if (value?.type) {
                    return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
                }
                return true
            })
    });

    const formik = useFormik({
        initialValues: {
            categoriesid: '',
            subcategory_id: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            pro_img: null,
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                dispatch(editdata({ ...values, _id: update }));
            } else {
                dispatch(addPoduct(values));
                console.log(values);
            }
            resetForm();
            handleClose();
        }
    });

    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;

    const changeSelect = (event) => {
        const chngadata = event.target.value;
        setFieldValue("categoriesid", chngadata);
        setFieldValue("subcategory_id", '');
        dispatch(getsubcategory({ categoriesid: chngadata }));
    };


    const handalfileschnge = (event) => {
        setFieldValue("pro_img", event.currentTarget.files[0]);

    };

    console.log(values);

    return (
        <>
            {
                products.isLoding ?
                    <Spinner>
                    </Spinner> :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Product
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{update ? 'Edit Product' : 'Add Product'}</DialogTitle>
                            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                                <DialogContent>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-select-label">Categories</InputLabel>
                                        <Select
                                            labelId="category-select-label"
                                            id="category-select"
                                            value={values.categoriesid}
                                            label="Category"
                                            name="categoriesid"
                                            onChange={changeSelect}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.categoriesid && touched.categoriesid)}
                                        >
                                            {categories.map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.categoriesid && touched.categoriesid && <span style={{ color: "red" }}>{errors.categoriesid}</span>}
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="subcategory-select-label">Select Subcategories</InputLabel>
                                        <Select
                                            labelId="subcategory-select-label"
                                            id="subcategory_id"
                                            value={values.subcategory_id}
                                            label="Subcategory"
                                            name="subcategory_id"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.subcategory_id && touched.subcategory_id)}
                                        >
                                            {subcategories.filter((v) => v.categoriesid === values.categoriesid)
                                                .map((v) => (
                                                    <MenuItem key={v._id} value={v._id}>
                                                        {v.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        {errors.subcategory_id && touched.subcategory_id && <span style={{ color: "red" }}>{errors.subcategory_id}</span>}
                                    </FormControl>

                                    <input
                                        id='pro_img'
                                        name="pro_img"
                                        type="file"
                                        onChange={handalfileschnge}
                                    />
                                    {errors.pro_img && touched.pro_img && <span style={{ color: "red" }}>{errors.pro_img}</span>}


                                    {
                                        values.pro_img &&
                                        <img src={values.pro_img?.url
                                            ? values.pro_img?.url
                                            : URL.createObjectURL(values?.pro_img)} width="50" height="50" />

                                    }


                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={Boolean(errors.name && touched.name)}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={Boolean(errors.description && touched.description)}
                                        helperText={errors.description && touched.description ? errors.description : ''}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="price"
                                        name="price"
                                        label="Price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        error={Boolean(errors.price && touched.price)}
                                        helperText={errors.price && touched.price ? errors.price : ''}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="stock"
                                        name="stock"
                                        label="Stock"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.stock}
                                        error={Boolean(errors.stock && touched.stock)}
                                        helperText={errors.stock && touched.stock ? errors.stock : ''}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                </DialogActions>
                            </form>
                        </Dialog>

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
                                getRowId={row => row._id}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>
                    </>
            }


        </>
    );
}

export default Products;
