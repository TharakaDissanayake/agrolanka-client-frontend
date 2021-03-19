// import React, { useState,useContext } from 'react'
// import './LoginRegister.css';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import ErrorDisplay from '../../components/authComponents/errorComponent';
// import Axios from "axios";
// import baseUrl from '../../config/api';
// import { useHistory } from "react-router-dom";
// import UserContext from "../../context/UserContext";
// function RegisterForm() {
//     const { userData, setUserData } = useContext(UserContext);
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const [error, setError] = useState();
//     const history = useHistory();
  
//     const formik = useFormik({
//       initialValues: {
//         email:'',
//         password:'',
   
//         firstName:'',
     
//         lastName:'',
//         tel:'',
//       },
//       validationSchema: Yup.object({
//         password: Yup.string()
//           .min(6, 'Must be 6 characters or more')
//           .required('Required'),
   
//           firstName: Yup.string()
//           .min(2, 'Must be 2 characters or more')
//           .required('Required'),
//           lastName: Yup.string()
//           .min(2, 'Must be 2 characters or more')
//           .required('Required'),
//           tel: Yup.string()
//           .min(10, 'Must be 10 characters')
//           .max(10,'Must be 10 characters')
//           .required('Required'),
//         email: Yup.string().email('Invalid email address').required('Required'),
//       }),
//       onSubmit: async values => {
//         try {

//             const newUser = {
//               email: values.email,
//               password:values.password,
//               passwordCheck:values.password,
//               firstName: values.firstName,
           
//               lastName: values.lastName,
//               tel:values.tel,
//               type: ""
//             };
//             setEmail(values.email);
//             setPassword(values.password);
//             console.log(newUser);
//             const result = await Axios.post(baseUrl + "users/register", newUser);
//             console.log(result);
//             if (result) history.replace("/login");
      
      
//           }
//           catch (error) {
      
//             error.response.data.msg && setError(error.response.data.msg);
//           }
//       },
//     });
//     return (
        
//         <form onSubmit={formik.handleSubmit} className="sign-up-form">
//         <h2 className="title">Sign up</h2>
//         <div className="input-field">
//           <i className="fas fa-user"></i>
//           <input
//              type="text"
//              name="firstname"
//              id="firstname"
//             onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.firstname}
//              placeholder='firstname'
//            />
//              </div>
//       {formik.touched.firstname && formik.errors.firstname ? (
//          <p style={{color:'red'}}>{formik.errors.firstname}</p>
//        ) : <p> </p>}
//         <div className="input-field">
//           <i className="fas fa-user"></i>
//           <input
//              type="text"
//              name="lastname"
//              id="lastname"
//             onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.lastname}
//              placeholder='lastname'
//            />
//              </div>
//       {formik.touched.lastname && formik.errors.lastname ? (
//          <p style={{color:'red'}}>{formik.errors.lastname}</p>
//        ) : <p> </p>}
//      <div className="input-field">
//           <i className="fas fa-user"></i>
//           <input
//              type="email"
//              name="email"
//              id="email"
//             onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.email}
//              placeholder='email'
//            />
//              </div>
//       {formik.touched.email && formik.errors.email ? (
//          <p style={{color:'red'}}>{formik.errors.email}</p>
//        ) : <p> </p>}
//           <div className="input-field">
//           <i className="fas fa-user"></i>
//           <input
//              type="tel"
//              name="tel"
//              id="tel"
//             onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.tel}
//              placeholder='Phone No'
//            />
//              </div>
//       {formik.touched.tel && formik.errors.tel ? (
//          <p style={{color:'red'}}>{formik.errors.tel}</p>
//        ) : <p> </p>}
//           <div className="input-field">
//           <i className="fas fa-user"></i>
//           <input
//              type="password"
//              name="password"
            
//             onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.password}
//              placeholder='password'
//            />
//              </div>
//       {formik.touched.password && formik.errors.password ? (
//          <p style={{color:'red'}}>{formik.errors.password}</p>
//        ) : <p> </p>}
//            <input style={{marginTop:'20px'}} type="submit" value="Sign up" className="btn btn-1" />
//         {error && (
//                 <div>
//                   <ErrorDisplay msg={error} handleError={() => setError(undefined)} />
//                 </div>
//               )}
   
       
        
//       </form>
//     )
// }

// export default RegisterForm
import React, { useState,useContext } from 'react'
import './LoginRegister.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorDisplay from '../../components/authComponents/errorComponent';
import Axios from "axios";
import baseUrl from '../../config/api';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
function RegisterForm(props) {
    const { userData, setUserData } = useContext(UserContext);

    const [error, setError] = useState();
    const history = useHistory();

    const formik = useFormik({
      initialValues: {
        
        password: '',
        email: '',
        firstname:'',
        lastname:'',
        tel:''
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
          firstname: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .required('Required'),
          lastname: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .required('Required'),
          tel: Yup.string()
          .min(10, 'Must be 10 characters')
          .max(10, 'Must be 10 characters')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      }),
      onSubmit: async values => {
        try {
            console.log(values);
            const newUser = {
              email: values.email,
              password:values.password,
              passwordCheck:values.password,
             
              firstName:values.firstname,
              lastName: values.lastName,
              tel: values.tel,
              type: ""
            };
         
            const result = await Axios.post(baseUrl + "users/register", newUser);
         
            if (result.status===200) props.triggerFunc();
            else{
                setError('User Already Exists');
            }
            // const loginRes = await Axios.post("http://localhost:5000/users/login", {
            //   email,
            //   password,
            // });
            // setUserData({
            //   token: loginRes.data.token,
            //   user: loginRes.data.user,
            // });
            // localStorage.setItem("auth-token", loginRes.data.token);
      
          }
          catch (error) {
         
            error.response.data.msg && setError(error.response.data.msg);
          }
      },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="sign-up-form">
        <h5 className="title">Register</h5>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
             type="firstname"
             name="firstname"
             id="firstname"
            onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.firstname}
             placeholder='firstname'
           />
             </div>
      {formik.touched.firstname && formik.errors.firstname ? (
         <p style={{color:'red'}}>{formik.errors.firstname}</p>
       ) : <p> </p>}
         <div className="input-field">
          <i className="fas fa-user"></i>
          <input
             type="text"
             name="lastname"
             id="lastname"
            onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.lastname}
             placeholder='lastname'
           />
             </div>
      {formik.touched.lastname && formik.errors.lastname ? (
         <p style={{color:'red'}}>{formik.errors.lastname}</p>
       ) : <p> </p>}
             <div className="input-field">
          <i className="fas fa-phone"></i>
          <input
             type="text"
             name="tel"
             id="tel"
            onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.tel}
             placeholder='Phone No'
           />
             </div>
      {formik.touched.tel && formik.errors.tel ? (
         <p style={{color:'red'}}>{formik.errors.tel}</p>
       ) : <p> </p>}
        <div className="input-field">
          <i className="fas fa-envelope"></i>
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
       
        <input style={{marginTop:'5px'}} type="submit" value="Register" className="btn btn-1" />
        {error && (
                <div>
                  <ErrorDisplay msg={error} handleError={() => setError(undefined)} />
                </div>
              )}
      </form>
    )
}

export default RegisterForm
