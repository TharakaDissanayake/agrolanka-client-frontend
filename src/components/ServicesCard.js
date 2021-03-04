import React from 'react'
import './ServicesCard.css';
import StarIcon from '@material-ui/icons/Star';
function ServicesCard({ iconName, title }) {
    return (
        <div className="services-item">

            <div className="row service-img">
                <img src={'./' + iconName + '.png'} />

            </div>
            <div className="row service-info">

                <h3>{title}</h3>
                <p>
                    Search for the keywords to learn more about each warning.
                    To ignore, add eslint-disable-next-line to the line before.
                </p>
            </div>

        </div>
    )
}

export default ServicesCard;
