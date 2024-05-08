import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { decrementQty, incrementQty, removeQty } from '../../../../admin/component/cart/cart.slice';
import { getCoupon } from '../../../../reduct/slice/coupon.slice';
import { date, object, string } from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import Button from '../../Ui/button/button';

function Cart(props) {

    const [discount, setdiscount] = useState(0)

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

    const Shipping = discount > 0 ? 3 : 0

    const totalDiscount = subtotal * (discount / 100);

    const Total = subtotal - totalDiscount + Shipping;

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
        coupon: string().required("please coupon Enter"),
    });


    const handalcoupon = (data) => {
        let flag = 0;
        console.log(data);
        coupon.coupon.map((v) => {
            if (v.coupon === data.coupon) {
                const creenetDate = new Date();

                const expriDate = new Date(v.expriy)

                if (creenetDate <= expriDate) {
                    flag = 1;
                    setdiscount(v.percentage)
                } else {
                    flag = 2;
                }

            }
            // if (cart.cart.length === 0) {
            //     formik.setFieldError("coupon", " cart is emty");
            // } else   
            if (flag === 0) {
                formik.setFieldError("coupon", " invalid couopn");
            } else if (flag === 1) {
                formik.setFieldError("coupon", "couopn valid");
            } else if (flag === 2) {
                formik.setFieldError("coupon", "expried");
            }
        })
    }


    const formik = useFormik({
        initialValues: {
            coupon: '',

        },
        validationSchema: couponSchema,
        onSubmit: (values) => {
            handalcoupon(values)
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
                            <input type="text"
                                name="coupon"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                value={values.coupon}
                                onChange={handleChange}
                                onBlur={handleBlur}


                            />
                            {errors.coupon && touched.coupon ? (
                                <span className="error">{errors.coupon}</span>
                            ) : null} <br></br>

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
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">dicount:{discount}%</h5>
                                        <p className="mb-0">{totalDiscount}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">flat rate:3</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${(Total).toFixed(2)}</p>
                                </div>
                                {/* <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button> */}
                                <Button 
                                    Btndisable={true}
                                    onClick={(v)=> console.log("ok")}
                                >
                                    Proceed Checkout
                                </Button>
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