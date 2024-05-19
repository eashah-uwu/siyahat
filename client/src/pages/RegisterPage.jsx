import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './LoginPage.css';
import RegisterForm from '../components/RegisterForm.jsx'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage({setProgress}){
    // const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    useEffect(() => {   
        setProgress(40);
        setTimeout(() => {
            setProgress(100);
        }, 2000);
    }, []);
    
    return(
        <Box>
            <img className="corner-image top-left rotate-once-c" src="assets/Picture7.png"></img>
            {/* <img className="corner-image top-right rotate-once-cc"  src="assets/Picture4.png"></img> */}
            {/* <img className="corner-image bottom-left rotate-once-c"  src="assets/Picture5.png"></img> */}
            <img className="corner-image bottom-right rotate-once-cc"  src="assets/Picture7.png"></img>
            
            <div>
                <Link to="/" className="header">
                    <img src="assets/siyahatdark.png" alt="Siyahat Logo" />
                </Link>
            </div>
            <Box
                className="form-box"
                width={isNonMobileScreens ? "40%" : "93%"}
                p="2rem"
                m="2rem auto"
                height="80%"
                left="30%"
                borderRadius="1.5rem"
                backgroundColor="transparent"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <RegisterForm className="form-component" />
            </Box>
        </Box>
    );
}

export default RegisterPage;