import React from 'react'
import SchoolIcon from '@material-ui/icons/School';
import './WhyusCard.css';
function WhyusCard() {
    return (
        <div className="why-us-item">
            <div className="icon">
                <SchoolIcon fontSize="large" style={{ color: '#24caac', marginBottom: '10' }} className="school-icon" />
            </div>
            <h3>Experience trainer</h3>
            <p>Lorem ipsum may be used as a placeholder before final copy is available.</p>
        </div>
    )
}

export default WhyusCard;
