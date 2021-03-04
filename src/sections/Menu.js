import './Menu.css';
import React from 'react'
import MenuCard from '../components/MenuCard';

function Menu() {
    return (
        <section className="menu-section sec-padding" id="menu">
            <div className="container">
                <div className="row section-title">

                    <h5>Special</h5>

                    <h3>Menu of the week</h3>

                </div>
                <div className="row section-content">

                    <MenuCard image='plate1' price={22.00} title='Fish Salad' type='Salad' />
                    <MenuCard image='plate2' price={15.40} title='Spinch Salad' type='Salad' />
                    <MenuCard image='plate3' price={13.80} title='Babados Salad' type='Salad' />
                </div>
            </div>
        </section>
    )
}

export default Menu
