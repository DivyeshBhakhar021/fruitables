import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { decrementQty, incrementQty, removeQty } from '../../../../admin/component/cart/cart.slice';
import { getCoupon } from '../../../../reduct/slice/coupon.slice';
import { date, object, string } from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';

function Cart(props) {

    const product = useSelector((state) => state.product)


    const coupon = useSelector((state) => state.coupon)
    console.log(coupon);

    const cart = useSelector((state) => state.Cart)
    console.log(cart, product);

    const productdata = cart.cart.map((v) => {
        const data = product.product.find((val) => val.id === v.pid)
        console.log(data);

        return { ...data, qty: v.qty }

    })

    const subtotal = productdata.reduce((a, b) => a + b.price * b.qty, 0)
    const Total = subtotal * 1.18

    console.log(productdata);

    useEffect(() => {
        dispatch(getCoupon())
    }, [])

    const dispatch = useDispatch();
    const handalincrement = (id) => {
        console.log(id);
        dispatch(incrementQty(id))
    }

    const handaldecrement = (id) => {
        console.log(id);
        dispatch(decrementQty(id))
    }

    const handaldel = (id) => {
        console.log(id);
        dispatch(removeQty(id))
    }

    let couponSchema = object({
        coupone: string().required(),
    });


    const handalcoupon = (data) => {
        console.log(data);
        if (data.coupon === coupon.coupon && data.date === coupon.date) {
            
        }
    }


    const formik = useFormik({
        initialValues: {
            coupone: '',

        },
        validationSchema: couponSchema,
        onSubmit: (values) => {
            handalcoupon({...values, date:new Date().toLocaleDateString()})
        }

    })
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

    return (



        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productdata.map((v) => (
                                        <tr>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={v.img} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price}</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handaldecrement(v.id)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span
                                                        className="form-control form-control-sm text-center border-0"
                                                    >
                                                        {v.qty}
                                                    </span>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handalincrement(v.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price * v.qty}</p>
                                            </td>
                                            <td>
                                                <button onClick={() => handaldel(v.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <TextField type="text"
                                name="coupone"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                value={values.coupone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.coupone && touched.coupone ? true : false}
                                helperText={errors.coupone && touched.coupone ? errors.coupone : ''}

                            />
                            <button
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                type="submit"
                            >Apply Coupon</button>
                        </form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">{subtotal}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">flat rate :$1.18</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">{Total}</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;