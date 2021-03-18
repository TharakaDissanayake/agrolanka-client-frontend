import React, { useState,useContext } from 'react'
import './LoginRegister.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorDisplay from '../../components/authComponents/errorComponent';
import Axios from "axios";
import baseUrl from '../../config/api';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForwardIcon from '@material-ui/icons/Forward';
function LoginRegister() {
  const history = useHistory();
  const [trigger, setTrigger] = useState(false);

  const triggerFunc = () => {
      setTrigger(!trigger);
  }
    return (
        <div>
           
             <div className={trigger ? 'container-auth' : 'container-auth sign-up-mode'}>
    <div className="forms-container">
      <div className="signin-signup"  >
   
   <LoginForm/>
  
     
        <RegisterForm triggerFunc={triggerFunc}/>
      </div>
    </div>

    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>Don't have an account?</h3>
       
    
          <button className="btn transparent" id="sign-up-btn" onClick={triggerFunc}>
            Sign up
          </button>
          <button className="btn empty" id="sign-up-btn" onClick={()=>history.push('/')}>
          <ForwardIcon/> Back to menu
          </button>
       
        </div>
        <img src="./img/nature.svg" className="image" alt="" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>Already have an account?</h3>
       
         <button className="btn transparent" id="sign-in-btn" onClick={triggerFunc}>
            Sign in
          </button>
           <button className="btn empty"  onClick={()=>history.push('/')}>
           <ForwardIcon/> Back to menu
          </button>
         
        </div>
        <img src="./img/nature.svg" className="image" alt="" />
      </div>
    </div>
  </div>

        </div>
    )
}

export default LoginRegister
