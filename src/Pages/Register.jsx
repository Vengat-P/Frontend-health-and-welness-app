import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        name:"",
        email:"",
        password:"",
        gender:"",
        height:"",
        weight:"",
        age:"",

    })
    return (
        <div>
            
        </div>
    );
};

export default Register;