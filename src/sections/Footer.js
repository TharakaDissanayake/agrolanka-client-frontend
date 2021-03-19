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
                            <li><a href="#contact" >Courses</a></li>
                            <li><a href="#contact" >Stories</a></li>
                            <li><a href="#contact" >Blog</a></li>
                            <li><a href="#contact" >Login</a></li>
                            <li><a href="#contact" >Signup</a></li>
                        </ul>
                    </div>
                    <div className='footer-item footer-contact'>
                        <h2>contact us</h2>
                        <p style={{color:'#24292d'}}><LocationOnIcon />Agriculture Office , Hambantota</p>
                        <p style={{color:'#24292d'}}><PhoneIcon />(+94) 123 232 432</p>
                        <p style={{color:'#24292d'}}><EmailIcon /> support@agrolanka.com </p>
                    </div>
                    <div className='footer-item footer-newsletter'>
                        <h2>newsletter</h2>
                        {/* <form>
                            <div className='input-group'>
                                <input type='text' placeholder='Your Email Here' className='form-control' />
                            </div>
                            <button type='submit' className='btn btn-1'>subscribe</button>
                            <ul className='sci'>
                                <li><a href='#contact'><img src='./facebook.png' alt="img"/></a></li>
                                <li><a href='#contact'><img src='./instagram.png' alt="img"/></a></li>
                                <li><a href='#contact'><img src='./twitter.png' alt="img"/></a></li>
                            </ul>
                        </form> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
