import React from 'react'
import api from '../firebase/api';
import './Login.css';
function Login({ onReceive }) {
    const handleFacebookLogin = async () => {
        let result = await api.fbPopup();
        if (result) {
            onReceive(result.user);
        }
        else {
            alert('Error!!')
        }
    }
    return (
        <div className="login">
            <div className="chatIntro">
                <img src="https://docs.smooch.io/images/channel-header-logos/logo_whatsapp.png" alt="" />
                <h1>Whatsapp messenger</h1>
                <h2>Connect you to the world everytime</h2>
                <button className="btn btn-primary" onClick={handleFacebookLogin}>Login</button>
            </div>

        </div >
    )
}

export default Login
