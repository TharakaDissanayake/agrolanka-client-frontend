import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './NowPlaying.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import AttachFileIcon from '@material-ui/icons/AttachFile';
export default function NowPlaying(props) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToScroll,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const history = useHistory();
  return (
    <Container>
      <div className="clearfix mt-5 mb-2">
  
     
      </div>
      <Slider {...settings}>
        {props.Adds.map(function(Adds) {
          return (
            <React.Fragment>
      
             
           
                   <div className="menu-item-slider"  onClick={async () => {
            await history.push(`/advertisements/${Adds._id}`);
            await props.loadFunc();

          }}>
            <div className="menu-item-img"> 
            <img src={Adds.image} alt="img" />
        <div class="price"><AttachFileIcon/> Rs. {Adds.price}</div>
               

    
   
            </div>
            <div className=" menu-item-text">
            {Adds.promoted && 
            <div><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/></div> }  
                <h6>{Adds.name}</h6>

                <span> {Adds.location}  - {Adds.category}</span>
                
            </div>


            <div className="row price-row">
              
                <VisibilityIcon style={{ color: '#069C54' }} />  {Adds.count} 
            </div>
            </div>
           
    
          </React.Fragment>
          );
        })}
      </Slider>
    </Container>
  );
}
