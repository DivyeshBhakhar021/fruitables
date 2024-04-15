import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import axios from "axios";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch, useSelector } from "react-redux";
import { addreview, deletereview, editreview, getreview } from "../../../reduct/action/review.action";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";



function Review(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const { id } = useParams();
  console.log(id);

  const review = useSelector((state) => state.review)
  console.log(review);

  let ReviewSchema = object({
    name: string().required(),
    email: string().email().required(),
    review: string().required(),
    rating: number().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      review: '',
      rating: ''
    },
    validationSchema: ReviewSchema,
    onSubmit: values => {
      const reviewDate = new Date();
      if (edit) {
        dispatch(editreview(values))
      } else {
        dispatch(addreview({ ...values, productId: id, reviewDateing: reviewDate }));
      }

      formik.resetForm();
    },
  });

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik

  const handlerdit = (data) => {
    formik.setValues(data)
    setEdit(true);
  }

  const handledelect = (id) => {
    dispatch(deletereview(id));

  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4 className="mb-5 fw-bold">Leave a Reply</h4>
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="border-bottom rounded">
              <TextField
                type="text"
                id="name"
                name="name"
                className="form-control border-0 me-4"
                placeholder="Your Name *"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name ? true : false}
                helperText={
                  errors.name && touched.name ? errors.name : ""
                }
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="border-bottom rounded">
              <TextField
                type="email"
                id="email"
                name="email"
                className="form-control border-0 me-4"
                placeholder="Yur email *"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? true : false}
                helperText={
                  errors.email && touched.email ? errors.email : ""
                }
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="border-bottom rounded my-4">
              <TextField
                type="text"
                id="review"
                name="review"
                className="form-control border-0"
                cols={30}
                rows={8}
                placeholder="Your Review *"
                spellCheck="false"
                defaultValue={""}
                value={values.review}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.review && touched.review ? true : false}
                helperText={
                  errors.review && touched.review ? errors.review : ""
                }
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="d-flex justify-content-between py-3 mb-5">
              <div className="d-flex align-items-center">
                <p className="mb-0 me-3">Please rate:</p>
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: 12 }}
                >
                  <Stack spacing={1}>
                    <Rating
                      defaultValue={0}
                      precision={0.5}
                      id="rating"
                      name="rating"
                      value={values.rating}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors.rating && touched.rating ? true : false
                      }
                      helperText={
                        errors.rating && touched.rating
                          ? errors.rating
                          : ""
                      }
                    />
                  </Stack>
                </div>
              </div>
              {/* <a href="#"  type='submit' className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</a> */}
              <Button
                className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                type="submit"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div>
        {
          review.isLoading ? (
            <p>Loading...</p>
          ) : review.error ? (
            <h1>{review.error}</h1>
          ) : (
            review.review.map((v, index) => (
              v.productId === id && (
                <div key={index} className="ml-3"> {/* Ideally, use v.id or a more unique identifier as the key */}
                  <p className="mb-2" style={{ fontSize: 14 }}>
                    {v.reviewDateing} {/* Assuming there's a typo, and it should be 'reviewDating' or 'reviewDate' */}
                  </p>
                  <div className="d-flex justify-content-between">
                    <h5>{v.name}</h5>
                    <Rating name="read-only" value={v.rating} readOnly />
                  </div>
                  <p className="text-dark">
                    {v.review}
                  </p>
                  <IconButton onClick={() => handlerdit(v)} className="btn btn-primary"><EditIcon /></IconButton> {/* Added space between btn and btn-primary */}
                   <IconButton onClick={() => handledelect(v.id)} className="btn btn-primary"><DeleteIcon /></IconButton>
                </div>
              )
            ))
          )
        }


      </div>
    </>
  );
}

export default Review;