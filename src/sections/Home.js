import React from 'react'
import './Home.css';
import Product from '../components/Product';
function Home() {
    return (
        <section className="home-section" id="home">
            <div className="container">
                <div className="row h-100 align-items-center align-content-center">
                    <div className="home-text">
                        <h1> Fall in love with <span>coding</span></h1>
                        <h2>Explore the world of copetitive programming</h2>
                        <a href="#" className="btn btn-1">Get started</a>
                    </div>
                    <div className="home-img">
                        <div className="home-img-inner">
                            <div className="home-course">
                                <div className="home-course-item">html</div>
                                <div className="home-course-item">css</div>
                                <div className="home-course-item">react</div>
                                <div className="home-course-item">node js</div>

                            </div>
                            <img src="./home-img.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // <div className='container home'>
        //     <div className='home_container'>
        //         <img className="home_img" src="./jumbotron.jpg" />
        //         <div className="row home_row">
        //             <div className="col-12 col-md-6"><Product /> </div>
        //             <div className="col-12 col-md-6"><Product /></div>
        //         </div>
        //         <div className="row home_row">
        //             <div className="col-12 col-md-4"><Product /> </div>
        //             <div className="col-12 col-md-4"><Product /></div>
        //             <div className="col-12 col-md-4"><Product /></div>
        //         </div>
        //         <div className="row home_row">
        //             <div className="col-12"><Product /> </div>

        //         </div>
        //     </div>

        // </div>
    )
}

export default Home
