import './Menu.css';
import React,{useState,useEffect} from 'react'
import MenuCard from '../../components/menu/MenuCard';
import baseUrl from "../../config/api" ;
import Axios from "axios";
import NowPlaying from '../../components/menu/NowPlaying';
import { HomeWrapper } from "./slickStyle";
function Menu() {
    const [promotedAds,setPromotedAdds]=useState([]);
    useEffect(() => {
        try {
            const renderSelect = async () => {

                // Axios.get(baseUrl + "categories/")
                //     .then((response) => {
                //         if (response.data.length > 0) {
                //             console.log(response.data)
                //             setCategories(response.data);

                //         }
                //     })
                Axios.get(baseUrl + "advertisements/promotedAds")
                .then((response) => {
                if (response.data.length > 0) {
                console.log(response.data)  
                setPromotedAdds(response.data);}
                  })
                .catch((error) => {
                console.log(error);
                });
            };
            let mounted = true
            renderSelect();
            return function cleanup() {
                mounted = false
            }
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    return (
        <section className="menu-section sec-padding" id="menu">
            <div className="container">
                <div className="row section-title justify-content-center">

                    <h5>Top Advertisements</h5>
                    {promotedAds.length >5 &&
                <div>
               
                <div className=" movie-slider-mobile" >
                <HomeWrapper>
               
                <NowPlaying Adds={promotedAds} loadFunc={()=>console.log('')}  slidesToShow={1} slidesToScroll={1}  />
                </HomeWrapper>
                </div>
                <div className=" movie-slider-tablet" >
                <HomeWrapper>
               
                <NowPlaying Adds={promotedAds}  loadFunc={()=>console.log('')} slidesToScroll={2} slidesToShow={2}  />
                </HomeWrapper>
                </div>
                <div className=" movie-slider-web" >
                <HomeWrapper>
               
                <NowPlaying Adds={promotedAds}  loadFunc={()=>console.log('')} slidesToScroll={2}  slidesToShow={4}   />
                </HomeWrapper>
                </div>
                </div>
    }
                    

                </div>
                
                {/* <div className="row section-content">

                    <MenuCard image='cabb' price={22.00} title='Fish Salad' type='Salad' location='Galle'/>
                    <MenuCard image='straw' price={15.40} title='Spinch Salad' type='Salad' location='Matara'/>
                    <MenuCard image='cabb' price={13.80} title='Babados Salad' type='Salad' location='Kandy'/>
                    <MenuCard image='cabb' price={22.00} title='Fish Salad' type='Salad' location='Galle'/>
                    <MenuCard image='straw' price={15.40} title='Spinch Salad' type='Salad' location='Matara'/>
                    <MenuCard image='cabb' price={13.80} title='Babados Salad' type='Salad' location='Kandy'/>
                </div> */}
            </div>
        </section>
    )
}

export default Menu
