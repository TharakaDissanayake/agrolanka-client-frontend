import React from 'react'
import CoursesCard from '../components/CoursesCard';
import './Courses.css';
function Courses() {
    return (
        <section className="courses-section sec-padding" id="courses">
            <div className="container">
                <div className="row">
                    <div className="section-title">
                        <h2><span>Popular</span> Courses</h2>
                    </div>
                </div>
                <div className="row courses-row">

                    <CoursesCard />
                    <CoursesCard />
                    <CoursesCard />
                    <CoursesCard />
                </div>
            </div>
        </section>
    )
}

export default Courses
