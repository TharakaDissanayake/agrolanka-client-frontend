import React from "react";
import "./singleAdMenu.css";
import { Link } from 'react-router-dom';

import SingleMapComponent from "../components/singleAdMenu/SingleMapComponent";
import axios from "axios";
import { Component } from "react";


import { dateCal } from '../utills/dateCal';

import Typography from '@material-ui/core/Typography';

import LinearProgress from '@material-ui/core/LinearProgress';
import baseUrl from "../config/api";
import MenuCard from "../components/menu/MenuCard";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import Comments from "../components/singleAdMenu/commentsComponent/Comments";

class SingleAddMenu extends Component {

  state = {
    product: null,
    membersProducts: [],
    similarProducts: [],
    loading: true
  };

  mapStyles = {

    margin: "15px 0 0 0",
  };

  loadFunc = () => {
    window.location.reload(false);
  }
  componentDidMount() {
    try {
      if (this.props.match.params.id) {
        axios
          .get(
            baseUrl + "advertisements/" + this.props.match.params.id
          )
          .then((response) => {

            this.setState({
              product: response.data,
            });
          })
          ///////////////////////////////
          .then(() => {
            const newAdd = {
              publisher: this.state.product.publisher._id,
              name: this.state.product.name,
              price: this.state.product.price,
              image: this.state.product.image,
              image_id: this.state.product.image_id,
              tel: this.state.product.tel,
              tel2: this.state.product.tel2,
              unit: this.state.product.unit,
              qty: this.state.product.qty,
              location: this.state.product.location,
              lat: this.state.product.lat,
              lng: this.state.product.lng,
              province: this.state.product.province,
              address: this.state.product.address,
              promoted: this.state.product.promoted,
              published: this.state.product.published,
              description: this.state.product.description,
              selectedCategory: this.state.product.category,
              count: parseInt(this.state.product.count) + 1,

            };

            console.log(newAdd);
            axios
              .post(
                baseUrl + "advertisements/update/" + this.state.product._id,
                newAdd
              )

          }).

          ////////////////////
          then(() => {

            axios
              .get(
                baseUrl + "advertisements/ads/member",

                {
                  headers: {
                    publisher: this.state.product.publisher._id,

                  },

                }
              )
              .then((response) => {


                this.setState({
                  membersProducts: response.data,
                  loading: false
                });
                console.log(this.state.membersProducts);
              }).
              //////////////////////////////
              then(() => {
                const similarName = this.state.product.name.split(" ");
                axios
                  .get(
                    baseUrl + "advertisements/ads/similar",

                    {
                      headers: {
                        category: this.state.product.category,
                        name: similarName[0]

                      },

                    }
                  )
                  .then((response) => {


                    this.setState({
                      similarProducts: response.data,
                      loading: false

                    });
                    console.log(this.state.similarProducts);
                  })
              })
              ///////////////////////
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });



      }
    }
    catch (err) {
      console.log(err)
    }

  }
  render() {


    if (!this.state.product) {
      return null;
    }
    else {
      let diffString = dateCal(this.state.product.createdAt);
      return (
        <div>
          <Header/>
          {this.state.loading ? <div className='loading-section'>

            <h5>Loading...</h5>
            <LinearProgress/>
      
          </div> : <div className='ad-section'>

                <div className="container">
                  <div className="row" id="ads">
                    <div className="col-md-12">

                      <div className="card rounded border" >

                        <div className="card-image">
                          <span className="name-btn">
                            <p className="ad-title">{this.state.product.name} - {this.state.product.location}</p>


                          </span>
                   
                            <img
                              className="img-fluid"
                              src={this.state.product.image}
                              width="687"
                              height="410"

                              alt="Alternate Text"
                            />
                    
                        </div>
                    

                        <div className="row justify-content-around">


                          <div className={this.state.product.address !==
                            "Please Select Your Location" ? (
                              "col-md-7 "
                            ) : (
                              "col-md-12"
                            )}>
                          
                              <div className="card-body">
                                <div className="ad-title m-auto"></div>
                                <span>     {"published by " + this.state.product.publisher.firstname + " " + diffString}
                                </span>



                                <div className="row mt-4">
                                  <div className="col-5 col-md-5 col-xl-3">
                                    <h6 >Price
              </h6>

                                  </div>
                                  <div className="col-7 col-md-7 col-xl-9">
                                    {this.state.product.unit === 'units' ? <span>1 unit for Rs. {this.state.product.price}     </span> :
                                      <span>1 {this.state.product.unit} for Rs. {this.state.product.price}
                                      </span>}
                                    {/* <h6 className="ad-details" >1 kg for {this.state.product.price} </h6> */}
                                  </div>
                                </div>

                                <div className="row mt-4">
                                  <div className="col-5 col-md-5 col-xl-3">
                                    <h6>Quantity
              </h6>
                                  </div>
                                  <div className="col-7 col-md-7 col-xl-9">
                                    <span>{this.state.product.qty} {this.state.product.unit} available
              </span>

                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-5 col-md-5 col-xl-3">
                                    <h6>Category
              </h6>
                                  </div>
                                  <div className="col-7 col-md-7 col-xl-9">
                                    <span >{this.state.product.category}
                                    </span>

                                  </div>
                                </div>

                                {this.state.product.address !==
                                  "Please Select Your Location" ? (
                                    <div className="row mt-4">
                                      <div className="col-5 col-md-5 col-xl-3">
                                        <h6>Address
              </h6>
                                      </div>
                                      <div className="col-7 col-md-7 col-xl-9">
                                        <span>{this.state.product.address}
                                        </span>

                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                <div className="row mt-4">
                                  <div className="col-5 col-md-5 col-xl-3">
                                    <h6>District
              </h6>
                                  </div>
                                  <div className="col-7 col-md-7 col-xl-9">
                                    <span>{this.state.product.location}
                                    </span>

                                  </div>
                                </div>
                                {this.state.product.address !== "Please Select Your Location" ? (
                                  <div className="row mt-4">
                                    <div className="col-5 col-md-5 col-xl-3">
                                      <h6>Province
              </h6>
                                    </div>
                                    <div className="col-7 col-md-7 col-xl-9">
                                      <span>{this.state.product.province}
                                      </span>

                                    </div>
                                  </div>
                                ) : (
                                    ""
                                  )}

                                <div className="row mt-4">
                                  <div className="col-5 col-md-5 col-xl-3">
                                    <h6>Contact
              </h6>
                                  </div>
                                  <div className="col-7 col-md-7 col-xl-9">
                                    <h4 className="ad-btn">
                                      <i className="fa fa-phone" aria-hidden="true"></i>
                                      {this.state.product.tel}
                                    </h4>
                                    {this.state.product.tel2 && <h4 className="ad-btn">
                                      <i className="fa fa-phone" aria-hidden="true"></i>
                                      {this.state.product.tel}
                                    </h4>}
                                  </div>
                                </div>

                              </div>
 
                          </div>

                          {this.state.product.address !==
                            "Please Select Your Location" ? (
                              
                                <div className="col-12 col-md-4 " style={this.mapStyles,{textAlign:'center'}}>
                                  <h6 >Explore the location using map
              </h6>
                                  <SingleMapComponent product={this.state.product} {...this.props} />
                                </div>
                              
                            ) : (
                              null
                            )}
 
                                  <div className="col-5 col-md-5 col-xl-3">
                                    <Link to={`/chat/${this.state.product.publisher._id}`}>CHAT
              </Link>
                                  </div>
                               
                          
                          <div className="col-12">
                            <hr></hr>

                            <div className="col-12">
                              <h6>Description
              </h6>
                            </div>
                            <div className="col-12">

                              <span >
                                {this.state.product.description}
                              </span>
                            </div>
                            <div className="col-12">
                            <hr></hr>
                            <Comments adId={this.props.match.params.id} advertisementPublisher={this.state.product.publisher._id} adImgUrl={this.state.product.image}/>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
           
                  {/* ///////////////////////////////////////////////// from here it is cards */}
                  <div className="container">
                    {this.state.membersProducts.length > 1 &&
                      <div className="col-12">

                             <h5>More advertisements from this member
              </h5> 

                      </div>
                    }
                    {
                      this.state.membersProducts.length < 2 && this.state.similarProducts.length > 1 &&
                      <div className="col-12">
                        <h5>Related Advertisements
              </h5>
                      </div>
                    }

                    <div className="row " id="ad">
                      {this.state.membersProducts.length > 1 &&
                        this.state.membersProducts.map((Add) => {
                          return (
                            <MenuCard Adds={Add} loadFunc={this.loadFunc}     {...this.props} key={Add._id} />
         );

                        })
                      }

                      {this.state.membersProducts.length < 2 && this.state.similarProducts.length > 1 &&
                        this.state.similarProducts.map((Add) => {
                          return (<MenuCard Adds={Add} loadFunc={this.loadFunc} key={Add._id}/>);

                        })
                      }

                    </div>

                  </div>
                </div>


         

            </div>}
  
<Footer/>
        </div>
      );
    }
  }
}

export default SingleAddMenu;
