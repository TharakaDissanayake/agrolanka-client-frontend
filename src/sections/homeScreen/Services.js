import React,{useState,useEffect} from 'react'
import ServicesCard from '../../components/home/ServicesCard';
import './Services.css';
import baseUrl from "../../config/api" ;
import Axios from "axios";
function Services() {
    useEffect(() => {
        try {
            const renderSelect = async () => {

                Axios.get(baseUrl + "categories/")
                    .then((response) => {
                        if (response.data.length > 0) {
                            console.log(response.data)
                            setCategories(response.data);

                        }
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
    const [categories, setCategories] = useState([]);
    return (
        <section className="services-section sec-padding" id="services">
            <div className="container">
                <div className="row section-title">

                    <h5>Select what you need</h5>

                 

                </div>
                <div className="row services-row">

{categories.map(category=>( <ServicesCard iconName={category.uri} title={category.label} key={category._id}/>)
          
)}
          
               
                  
                </div>
            </div>
        </section>
    )
}

export default Services;
