import React, { useState,useContext } from 'react'
import './LoginRegister.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorDisplay from '../../components/authComponents/errorComponent';
import Axios from "axios";
import baseUrl from '../../config/api';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import db from '../../firebase';

import firebase from 'firebase';
function LoginForm() {
    const { userData, setUserData } = useContext(UserContext);

    const [error, setError] = useState();
    const history = useHistory();

    const formik = useFormik({
      initialValues: {
        
        password: '',
        email: '',
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
        
        email: Yup.string().email('Invalid email address').required('Required'),
      }),
      onSubmit: async values => {
        try{
        const user = {
          email: values.email,
          password: values.password
        };
  
        const loginRes = await Axios.post(baseUrl + "users/login", user);
        //////////////////////firebase add user////////////////////////
          await db.collection('users').doc(loginRes.data.user.id).set({
          firstname:loginRes.data.user.firstname,
          avatar:'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg'
      }, { merge: true })
        
        /////////////////////
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
       
        history.replace("/");
      }
      catch (error) {
        error.response.data.msg && setError(error.response.data.msg)
  
      }
      },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="sign-in-form">
            <img className='reg-logo' src='./logo.png'/>
        <h5 className="title">Sign in</h5>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
             type="email"
             name="email"
             id="email"
            onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.email}
             placeholder='email'
           />
             </div>
      {formik.touched.email && formik.errors.email ? (
         <p style={{color:'red'}}>{formik.errors.email}</p>
       ) : <p> </p>}
      
        <div className="input-field">
          <i className="fas fa-lock"></i>
         
          <input
             type="password"
             name="password"
             id="password"
             onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder='password'
           />
           </div>
                 {formik.touched.password && formik.errors.password ? (
         <p style={{color:'red'}}>{formik.errors.password}</p>
       ) : <p > </p>}
       
        <input style={{marginTop:'20px'}} type="submit" value="Login" className="btn btn-1" />
        {error && (
                <div>
                  <ErrorDisplay msg={error} handleError={() => setError(undefined)} />
                </div>
              )}
      </form>
    )
}

export default LoginForm
