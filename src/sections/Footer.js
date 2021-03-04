import React from 'react'
import './Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
const style = {
    marginRight: '20'
}
function Footer() {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='footer-item footer-about'>
                        <h2>about us</h2>
                        <p>Lorem ipsum may be used as a placeholder before final copy is available.</p>
                        <div className='social-links'>
                            <FacebookIcon style={style} />
                            <TwitterIcon style={style} />
                            <InstagramIcon style={style} />
                            <YouTubeIcon style={style} />
                        </div>
                    </div>
                    <div className='footer-item footer-quick-links'>
                        <h2>quick links</h2>
                        <ul>
                            <li><a href="#" >Courses</a></li>
                            <li><a href="#" >Stories</a></li>
                            <li><a href="#" >Blog</a></li>
                            <li><a href="#" >Login</a></li>
                            <li><a href="#" >Signup</a></li>
                        </ul>
                    </div>
                    <div className='footer-item footer-contact'>
                        <h2>contact us</h2>
                        <p><LocationOnIcon /> xyz Fllor, 12 Sector ,New delhi</p>
                        <p><PhoneIcon /> 0712123422 </p>
                        <p><EmailIcon /> lahiru@gmail.com </p>
                    </div>
                    <div className='footer-item footer-newsletter'>
                        <h2>newsletter</h2>
                        <form>
                            <div className='input-group'>
                                <input type='text' placeholder='Your Email Here' className='form-control' />
                            </div>
                            <button type='submit' className='btn btn-1'>subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
