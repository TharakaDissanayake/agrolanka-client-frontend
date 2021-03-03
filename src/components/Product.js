import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import './Product.css';
function Product() {
    return (
        <div className="product">
            <div className="product_info">
                <p>This is the title</p>
                <p className="product_info_price"><strong>Rs.20.00</strong></p>
                <div className="product_info_rating">
                    <StarIcon color="error" />
                    <StarIcon color="error" />
                    <StarIcon color="error" />
                </div>
                <img src="http://res.cloudinary.com/uwusam/image/upload/v1611535180/R82d84f3387d2519bedb22d9eb16629fd_ozyfxn.jpg" />
                <br></br>
                <button>Add to basket</button>
            </div>

        </div>
    )
}

export default Product
