import { useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from 'react-dropzone';
import { useMediaQuery } from '@material-ui/core';
import {
    Box,
    Button,
    TextField,
    Typography,  
} from "@mui/material";
import FlexBetween from './FlexBetween';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from 'react-router-dom';

//data validation
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    // occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

function RegisterForm() {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isRegister = pageType === "login";
    const isLogin = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        await register(values, onSubmitProps)
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form className="loginForm" onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="90vh"
                        backgroundColor="transparent"
                        marginTop="2rem"
                    >
                        <Box
                            display="grid"
                            gap="10px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2", pt: '0.5rem' }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2", pt: '0.5rem' }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 2", pt: '0.5rem' }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 2", pt: '0.5rem' }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid black`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed black`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2", pt: '0.5rem' }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2", pt: '0.5rem' }}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" mt="1rem">
                            <Button
                                type="submit"
                                sx={{
                                    m: "1rem 0",
                                    p: "1rem",
                                    width: "200px",
                                    backgroundColor: "#8A1F5A",
                                    color: "#FFFFFF",
                                    borderRadius: "0.5rem",
                                    "&:hover": {
                                        backgroundColor: "#9e2c6b", 
                                    },
                                }}
                            >
                                REGISTER
                            </Button>
                            <Link className="link" to="/login" style={{ marginTop: "0rem" }}>Already have an account?</Link>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default RegisterForm;
