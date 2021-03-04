import React from 'react'
import './MenuCard.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
function MenuCard({ image, price, title, type }) {
    return (

        <div className="menu-item">
            <div className="menu-item-img"> <img src={'./' + image + '.png'} /></div>
            <div className=" menu-item-text">

                <h5>{title}</h5>

                <span>{type}</span>
            </div>


            <div className="row price-row">
                <span>${price}</span>
                <ShoppingCartIcon style={{ color: '#069C54' }} />
            </div>
        </div>
    )
}

export default MenuCard
