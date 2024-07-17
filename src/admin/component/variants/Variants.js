import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select, IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import { object, string, boolean, number, array, mixed } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { productdata } from '../../../reduct/action/Product.action';
import { getCategory } from '../../../reduct/action/category.action';
import { getsubcategory } from '../../../reduct/slice/subcategory.slice';
import { getVariantData, handleAdd, handleRemove, handleUpdateData } from '../../../reduct/slice/variants.slice';

function Variants(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [imageFields, setImageFields] = useState([]);
    const dispatch = useDispatch();

    const products = useSelector(state => state.product.product);
    const subcategories = useSelector(state => state.subcategory.subcategory);
    const categories = useSelector(state => state.category.category);
    const variants = useSelector(state => state.variants.variants);

    // console.log("subcategories", subcategories,);
    // console.log("categories", categories,);
    // console.log("products", products);

    useEffect(() => {
        dispatch(productdata());
        dispatch(getCategory());
        dispatch(getsubcategory());
        dispatch(getVariantData())
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        setDynamicFields([]);
        formik.resetForm();
    };

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            additionalFields: Object.entries(data.attributes).map(([key, value]) => ({ key, value })),
        });
        setOpen(true);
        setUpdate(true);
        setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
    };

    const handleDelete = (id) => {
        dispatch(handleRemove(id));
    };

    const variantSchema = object({
        is_active: boolean(),
        subcategory_id: string().required('Subcategory is required'),
        category_id: string().required('Category is required'),
        product_id: string().required('Product is required'),
        name: string().required("Name is required"),
        quantity: number().required("Quantity is required"),
        price: number().required("Price is required"),
        discount: string().required("Discount is required"),

        additionalFields: array()
            .of(
                object().shape({
                    key: string().required("Key is required"),
                    value: string().required("Value is required"),
                })
            )
            .min(1, "At least one attribute is required"),
        variant_image: mixed().required("Please upload image")
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

            }),
    });

    const formik = useFormik({
        initialValues: {
            is_active: true,
            subcategory_id: '',
            category_id: '',
            product_id: '',
            additionalFields: [],
            name: '',
            quantity: '',
            price: '',
            discount: '',
            variant_image: [],

        },
        validationSchema: variantSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            const attributes = {
                ...values.additionalFields.reduce((acc, field) => {
                    acc[field.key] = field.value;
                    console.log("fghjklhjk", acc, field.key, field.value);
                    return acc;
                }, {})
            };

            console.log(attributes);

            const variantData = {
                ...values,
                attributes,
            };

            if (update) {
                dispatch(handleUpdateData(variantData));
            } else {
                dispatch(handleAdd(variantData));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = formik;

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const columns = [
        { field: 'is_active', headerName: 'Active', width: 90, renderCell: (params) => (params.value ? 'Yes' : 'No') },
        {
            field: 'category_id', headerName: 'Category', width: 130,
            renderCell: (params) => {
                const category = categories.find((v) => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: 'Subcategory', width: 130,
            renderCell: (params) => {
                const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
                return subcategory ? subcategory.name : '';
            }
        },
        {
            field: 'product_id', headerName: 'Product', width: 130,
            renderCell: (params) => {
                const product = products.find((v) => v._id === params.row.product_id);
                return product ? product.name : '';
            }
        },
        {
            field: 'attributes', headerName: 'Attributes', width: 100,
            renderCell: (params) => {
                const attributes = params.row.attributes;
                return attributes ? Object.entries(attributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
            }
        },
        {
            field: 'variant_image', headerName: 'variant Image', width: 200,
            renderCell: (params) => {
                const image = params.row.variant_image;
                return image
                    ? image.map((i) => (
                        <img
                            key={i._id}
                            src={i.url}
                            alt="preview"
                            style={{ width: "50px", height: "50px", marginRight: "10px" }}
                        />
                    ))
                    : "";
            },
        },
        {
            field: 'price', headerName: 'price', width: 100,
        },
        {
            field: 'discount', headerName: 'discount', width: 100,
        }, {
            field: 'quantity', headerName: 'quantity', width: 100,
        },

        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const addImageField = () => {
        setImageFields([...imageFields, { file: null, preview: "" }]);
    };

    const removeImageField = (index) => {
        const updatedFields = [...imageFields];
        updatedFields.splice(index, 1);
        setImageFields(updatedFields);
    };

    const handleImageFieldChange = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedFields = [...imageFields];
            updatedFields[index] = { file, preview: URL.createObjectURL(file) };
            setImageFields(updatedFields);
        }
    };

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Variant
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{update ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    name="category_id"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {categories.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>
                                            {v.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.category_id && errors.category_id ? (
                                    <div>{errors.category_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                                <Select
                                    labelId="subcategory-select-label"
                                    id="subcategory-select"
                                    name="subcategory_id"
                                    value={values.subcategory_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        subcategories.filter((v) => v.categoriesid === values.category_id)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.subcategory_id && errors.subcategory_id ? (
                                    <div>{errors.subcategory_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="product-select-label">Product</InputLabel>
                                <Select
                                    labelId="product-select-label"
                                    id="product-select"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        products.filter((v) => v.subcategory_id === values.subcategory_id)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.product_id && errors.product_id ? (
                                    <div>{errors.product_id}</div>
                                ) : null}
                            </FormControl>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Enter Variant name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={touched.name && errors.name ? true : false}
                                helperText={touched.name && errors.name ? errors.name : ""}
                            />
                            <TextField
                                margin="dense"
                                id="quantity"
                                name="quantity"
                                label="Add Quantity"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.quantity}
                                error={touched.quantity && errors.quantity ? true : false}
                                helperText={
                                    touched.quantity && errors.quantity ? errors.quantity : ""
                                }
                            />
                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="Add Price"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={touched.price && errors.price ? true : false}
                                helperText={touched.price && errors.price ? errors.price : ""}
                            />
                            <TextField
                                margin="dense"
                                id="discount"
                                name="discount"
                                label="Enter Variant discount"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discount}
                                error={touched.discount && errors.discount ? true : false}
                                helperText={
                                    touched.discount && errors.discount ? errors.discount : ""
                                }
                            />

                            {/* <input
                                id="variant_image"
                                name="variant_image"
                                label="variant_image"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={(event) => {
                                    setFieldValue("variant_image", event.currentTarget.files[0]);
                                }}
                                onBlur={handleBlur}
                                sx={{ marginBottom: 2 }}
                            />
                            <br></br><br></br>
                            {
                                values.variant_image &&
                                <img src={values.variant_image.url ? values.variant_image.url : URL.createObjectURL(values.variant_image)} width={50} />
                            }
                            {errors.variant_image && touched.variant_image ? <span style={{ color: "red" }}>{errors.variant_image}</span> : null} */}

                            <div>
                                {imageFields.map((img, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            gap: "20px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <input
                                            type="file"
                                            onChange={handleImageFieldChange(i)}
                                            style={{ display: "none" }}
                                            id={`variant_image[${i}].file`}
                                            name={`variant_image[${i}].file`}
                                            accept="variant_image/*"
                                        />
                                        <label htmlFor={`variant_image[${i}].file`}>
                                            <Button variant="contained" component="span">
                                                Upload
                                            </Button>
                                        </label>
                                        {img.preview && (
                                            <img
                                                src={img.preview}
                                                alt="preview"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    marginRight: "10px",
                                                }}
                                            />
                                        )}
                                        <IconButton onClick={() => removeImageField(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button
                                    variant="outlined"
                                    onClick={addImageField}
                                    style={{ marginTop: "20px" }}
                                >
                                    Add Image
                                </Button>
                            </div>

                            <div>
                                {dynamicFields.map((f, i) => (
                                    <div key={i} >
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}]`.key}
                                            name={`additionalFields[${i}]`.key}
                                            label="Key"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'key')}
                                            value={f.key}
                                        />
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}]`.values}
                                            name={`additionalFields[${i}]`.values}
                                            label="Value"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'value')}
                                            value={f.value}
                                        />
                                        <IconButton onClick={() => removeField(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={addField}>
                                    Add Field
                                </Button>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                {update ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={variants}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    );
}

export default Variants;
