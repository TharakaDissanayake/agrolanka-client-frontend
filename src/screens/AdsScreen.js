import React, { Component } from "react";
import Filter from "../components/menu/Filter";
import Search from "../components/menu/Search";
import axios from "axios";

import queryString from "query-string";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import MapComponent from "../components/menu/mapComponent";
import { createBrowserHistory } from "history";


import PaginationComponent from "../components/menu/Pagination";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import baseUrl from "../config/api" ;
import './AdsScreen.css';
import MenuCard from "../components/menu/MenuCard";
import NowPlaying from "../components/menu/NowPlaying";
import { HomeWrapper } from "./slickStyle";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
const history = createBrowserHistory();

class AdsScreen extends Component {
  constructor(props) {
    super(props);

    this.loadFunction = this.loadFunction.bind(this);
    this.state = {
      Adds: [],
      adds: [],
      promotedAds: [],
      Categories: [],

      locations: [],

      selectedLocation: "All of SriLanka",
      selectedCategory: "All Categories",
      search: null,
      page: 1,
      count: 0,
      size: 15,
      loading: true,

    };
  }


  loadFunction() {
    try {
        
      this.setState({

        loading: true
      });
      const filterObj = {};

      if (queryString.parse(this.props.location.search).location) {
        filterObj["location"] = queryString.parse(
          this.props.location.search
        ).location;
        this.setState({
          selectedLocation: filterObj["location"],
        });
      } else {
        this.setState({
          selectedLocation: "All Of SriLanka",
        });
      }

      if (queryString.parse(this.props.location.search).category) {
        filterObj["category"] = queryString.parse(
          this.props.location.search
        ).category;
        this.setState({
          selectedCategory: filterObj["category"],
        });
      } else {
        this.setState({
          selectedCategory: "All Categories",
        });
      }

      if (this.props.location.search.search) {
        filterObj["name"] = queryString.parse(this.props.location.search).search;
        this.setState({
          search: filterObj["name"],
        });
      }

      if (this.props.location.search) {
        filterObj["page"] = parseInt(
          queryString.parse(this.props.location.search).page
        );
        this.setState({
          page: filterObj["page"],
        });
        filterObj["size"] = parseInt(
          queryString.parse(this.props.location.search).size
        );
        this.setState({
          size: filterObj["size"],
        });
      }

      console.log(filterObj.name);

      axios
        .get(
          baseUrl + "advertisements/promotedAds",

          {

            params: {
             
              category: filterObj.category,
              // name: filterObj.name,
            },
          }
        )
        .then((response) => {


          this.setState({
            promotedAds: response.data,

          });
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          baseUrl + "advertisements/",

          {
            headers: {
              name: filterObj.name,
              page: filterObj.page,
              size: filterObj.size,
            },
            params: {
              location: filterObj.location,
              category: filterObj.category,
              // name: filterObj.name,
            },
          }
        )
        .then((response) => {


          this.setState({
            Adds: response.data,
            adds: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      ////////////////////////////
      axios
        .get(
          baseUrl + "advertisements/count",

          {
            headers: {
              name: filterObj.name,
            },
            params: {
              location: filterObj.location,
              category: filterObj.category,
            },
          }
        )
        .then((response) => {


          this.setState({
            count: response.data,
            loading: false
          });

        })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    try {
    
      this.loadFunction();
      axios
        .get(baseUrl + "categories/")
        .then((response) => {
          if (response.data.length > 0) {
            // adds = response.data.map((advertisement) => advertisement);
            this.setState({
              Categories: response.data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(baseUrl + "locations/")
        .then((response) => {
          if (response.data.length > 0) {
            // adds = response.data.map((advertisement) => advertisement);
            this.setState({
              locations: response.data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
    catch (err) {
      console.log(err)
    }
  }
  render() {
    const handlePageChange = async (event, value) => {
      try {
        let pathname = this.props.location.pathname;

        let searchParams = new URLSearchParams(this.props.location.search);

        searchParams.set("page", value);
        await this.props.history.push({
          pathname: pathname,
          search: searchParams.toString(),
          
        });

        await this.loadFunction();
      }
      catch (err) {
        console.log(err)
      }
    };


    const resetFunc = async () => {
      try {
        let pathname = this.props.location.pathname;
        // returns path: '/app/books'
        let searchParams = new URLSearchParams(this.props.location.search);
        // returns the existing query string: '?type=fiction&author=fahid'
        searchParams.set("search", "");
        searchParams.set("location", "");
        searchParams.set("category", "");
        searchParams.set("page", "1");
        searchParams.set("size", "12");
        await this.props.history.push({
          pathname: pathname,
          search: searchParams.toString(),
        });
        this.setState({
          selectedLocation: "All of SriLanka",
          selectedCategory: "All Categories",
          search: null,
        });
        await this.loadFunction();
      }
      catch (err) {
        console.log(err)
      }
    };

    ///////////////////////////////////////////////////////////////////////////////////

    const filterByCategory = async (value) => {
      try {
        let pathname = this.props.location.pathname;
        // returns path: '/app/books'
        let searchParams = new URLSearchParams(this.props.location.search);
        // returns the existing query string: '?type=fiction&author=fahid'
        if (value.category === "All Categories") {
          searchParams.set("category", "");
        } else {
          searchParams.set("category", value.label);
        }

        searchParams.set("page", 1);
        await this.props.history.push({
          pathname: pathname,
          search: searchParams.toString(),
        });
        await this.loadFunction();
      }
      catch (err) {
        console.log(err)
      }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    const filterByLocation = async (value) => {
      try {
        let pathname = this.props.location.pathname;
        // returns path: '/app/books'
        let searchParams = new URLSearchParams(this.props.location.search);
        // returns the existing query string: '?type=fiction&author=fahid'
        if (value.location === "All Of SriLanka") {
          searchParams.set("location", "");
        } else {
          searchParams.set("location", value.location);
        }

        searchParams.set("page", 1);
        await this.props.history.push({
          pathname: pathname,
          search: searchParams.toString(),
        });
        await this.loadFunction();
      }
      catch (err) {
        console.log(err)
      }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////

    const searchSpace = async (event) => {
      try {
        if ((event.keyCode === 13) && (event.target.value.length > 0)) {
          let pathname = this.props.location.pathname;
          // returns path: '/app/books'
          let searchParams = new URLSearchParams(this.props.location.search);
          // returns the existing query string: '?type=fiction&author=fahid'
          searchParams.set("search", event.target.value);
          searchParams.set("page", 1);
          await this.props.history.push({
            pathname: pathname,
            search: searchParams.toString(),
          });
          await this.loadFunction();
        }
      }
      catch (err) {
        console.log(err)
      }
    };
    const searchSpaceMouse = async (name) => {
      try {
        let pathname = this.props.location.pathname;
        // returns path: '/app/books'
        let searchParams = new URLSearchParams(this.props.location.search);
        // returns the existing query string: '?type=fiction&author=fahid'
        searchParams.set("search", name);
        searchParams.set("page", 1);
        await this.props.history.push({
          pathname: pathname,
          search: searchParams.toString(),
        });
        await this.loadFunction();
      }
      catch (err) {
        console.log(err)
      }
    };
    const numOfAdvertisements = () => {
      try {
        if (this.state.count === 0 || this.state.count === 1) {
          return (
<h5 style={{marginTop:'35px'}}>{this.state.count} Advertisement Found</h5>
          );
        }
        return (
            <h5 style={{marginTop:'35px'}}>{this.state.count} Advertisements Found</h5>


        );
      }
      catch (err) {
        console.log(err);
      }
    }

    const AddsComponent = (props) => {
      return (
       




          <div className="container" id="ads-top">
            <div className="row justify-content-center" >
            {this.state.loading===false && this.state.promotedAds.length >5 &&
                <div>
                <span style={{color:'#069c54',fontSize:'20px', textAlign:'center',margin:'44px 0 -30px -5px'}} className="title">Top Advertisements</span>
                <div className=" movie-slider-mobile" >
                <HomeWrapper>
               
                <NowPlaying Adds={this.state.promotedAds} loadFunc={this.loadFunction}  slidesToShow={1} slidesToScroll={1}  {...props}/>
                </HomeWrapper>
                </div>
                <div className=" movie-slider-tablet" >
                <HomeWrapper>
               
                <NowPlaying Adds={this.state.promotedAds}  loadFunc={this.loadFunction} slidesToScroll={2} slidesToShow={2}  {...props}/>
                </HomeWrapper>
                </div>
                <div className=" movie-slider-web" >
                <HomeWrapper>
               
                <NowPlaying Adds={this.state.promotedAds}  loadFunc={this.loadFunction} slidesToScroll={2}  slidesToShow={4}   {...props}/>
                </HomeWrapper>
                </div>
                </div>
    }

              <div className="col-lg-12  mt-7" >
                {numOfAdvertisements()}
                <div className="row justify-content-between" >

                  <div className="col-12 col-lg-6 " >
                    <Filter
                      count={this.state.count}
                      locations={this.state.locations}
                      categories={this.state.Categories}
                      selectedLocation={this.state.selectedLocation}
                      selectedCategory={this.state.selectedCategory}
                      onChange={filterByLocation}
                      onChange2={filterByCategory}
                      {...props}
                    />
                  </div>
                  <div className="col-12 col-lg-6" style={{marginTop:'6px'}} >
                    <Search
                      searchSpace={searchSpace}
                      searchSpaceMouse={searchSpaceMouse}
                      searchAdd={this.state.search}
                      reset={resetFunc}
                      {...props}
                    />
                  </div>
                  <div className="col-12 mb-3">   
                   <Button
                  variant="contained"
                  color="secondary"
                  style={{backgroundColor:'#069c54',marginTop:'15px'}}
                  fullWidth
                  onClick={resetFunc}
                  endIcon={<RotateLeftIcon>Reset All Filters</RotateLeftIcon>}>
                  Reset All Filters
                </Button>
                </div>
              </div>
              <div className="row justify-content-between" >
                  <div className="col-12 mt-4 mb-5">
                <MapComponent Adds={this.state.Adds} {...props} />
              </div>
                </div>

               

              </div>


             

              <div className="col-12">
                {/* {this.state.promotedAds.length === 3 &&
                  <div className="row section-content" id="ad">
                    {this.state.promotedAds.map((Add) => {
                      return (
                        <MenuCard Adds={Add} loadFunc={this.loadFunction}     {...props} key={Add._id} />
                      );
                    })}

                  </div>} */}
                <div className="row section-content" id="ad">
                  {this.state.Adds.map((Add) => {
                    return (
                      <MenuCard Adds={Add} loadFunc={this.loadFunction}     {...props} key={Add._id} />
                    );
                  })}

                </div>
        
                <PaginationComponent
                  size={this.state.size}
                  count={this.state.count}
                  page={this.state.page}
                  handlePageChange={handlePageChange}

                  {...props}
                />

              </div>
            </div>
          </div>

       

      );
    };

    return (
      <div>
          <Header/>
        {
          this.state.loading ? 
          <div className='progress-section'>

            <h5>Loading...</h5>
            <LinearProgress  />
          </div> : 
          <div className='ads-section'>
              
              <AddsComponent />


            </div>
        }
<Footer/>
      </div >



    );
  }
}

export default AdsScreen;
