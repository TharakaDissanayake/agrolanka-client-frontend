import React from 'react'
import './ServicesCard.css';
import StarIcon from '@material-ui/icons/Star';
import { useHistory } from "react-router-dom";
function ServicesCard({ iconName, title }) {
    const history = useHistory();
    return (
        <div className="services-item" onClick={()=>history.push(`/menu?search=&location=&category=${title}&page=1&size=12`)}>

            <div className="row service-img">
                <img src={iconName} alt="img"/>

            </div>
            <div className="row service-info">

                <h6>{title}</h6>
               
            </div>

        </div>
    )
}

export default ServicesCard;
