import React, { useState, useContext } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { ThemeContext } from '../../../context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../reduct/slice/auth.slice';

function Login() {
    const themeContext = useContext(ThemeContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formMode, setFormMode] = useState('login'); // 'signIn', 'login', 'forgotPassword'

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dispatch = useDispatch()

    // Define the validation schema based on the form mode
    const getValidationSchema = () => {
        switch (formMode) {
            case 'signIn':
                return object({
                    name: string().required("Please enter your name"),
                    email: string().required("Please enter your email").email("Please enter a valid email"),
                    password: string().required("Please enter your password")
                });
            case 'login':
                return object({
                    email: string().required("Please enter your email").email("Please enter a valid email"),
                    password: string().required("Please enter your password")
                });
            case 'forgotPassword':
                return object({
                    email: string().required("Please enter your email").email("Please enter a valid email")
                });
            default:
                return object();
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: getValidationSchema(),
        onSubmit: (values) => {
            console.log(values);

            if (formMode === 'login') {
                dispatch(login(values))
            } else if (formMode === 'signIn') {
                dispatch(register({ ...values, 'role': 'user' }))

            }
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;


    console.log(errors);

    return (
        <div>
            {/* <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Login</li>
                </ol>
            </div> */}
            <div className={`login-container ${themeContext.theme}`}>
                <div className="login-form-container" style={{ 'marginTop': '100px' }}>
                    <div className="login-form-header">
                        <h1>{formMode === 'forgotPassword' ? 'Forgot Password' :
                            formMode === 'signIn' ? 'Sign In' : 'Login'}</h1>
                    </div>
                    <div className="login-form-body">
                        <form onSubmit={handleSubmit}>
                            {formMode === 'signIn' && (
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    name='name'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    errorText={errors.name && touched.name ? errors.name : ''}
                                />
                            )}

                            {(formMode === 'login' || formMode === 'signIn') && (
                                <Input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    name='email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    errorText={errors.email && touched.email ? errors.email : ''}
                                />
                            )}

                            {(formMode === 'login' || formMode === 'signIn') && (
                                <FormControl variant="outlined" fullWidth margin="normal">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        name='password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={Boolean(errors.password && touched.password)}
                                        helperText={errors.password && touched.password ? errors.password : ''}
                                    />
                                </FormControl>
                            )}

                            {formMode === 'forgotPassword' && (
                                <Input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    name='email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    errorText={errors.email && touched.email ? errors.email : ''}
                                />
                            )}

                            {formMode !== 'forgotPassword' && (
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Remember me"
                                />
                            )}

                            {formMode !== 'forgotPassword' && (
                                <button className="submit-button" type="submit">
                                    {formMode === 'signIn' ? 'Sign In' : 'Login'}
                                </button>
                            )}
                        </form>
                        <div className="form-footer">
                            {formMode === 'login' && (
                                <>
                                    <button onClick={() => setFormMode('signIn')} className="form-toggle-button">Sign In</button>
                                    <button onClick={() => setFormMode('forgotPassword')} className="form-toggle-button">Forgot Password?</button>
                                </>
                            )}
                            {formMode === 'signIn' && (
                                <button onClick={() => setFormMode('login')} className="form-toggle-button">Login</button>
                            )}
                            {formMode === 'forgotPassword' && (
                                <button onClick={() => setFormMode('login')} className="form-toggle-button">Back to Login</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

