import React from 'react'
import './CoursesCard.css';
import StarIcon from '@material-ui/icons/Star';
function CoursesCard() {
    return (
        <div className="courses-item">
            <a href="#" className="course-link">
                <div className="course-img">
                    <img src='./courses/2.jpg' />
                    <div className="course-price">
                        $125
                    </div>
                </div>
                <div className="course-info">
                    <ul>
                        <li>25 lectures</li>
                        <li>
                            <StarIcon style={{ color: '#eaa023' }} />
                            <StarIcon style={{ color: '#eaa023' }} />
                            <StarIcon style={{ color: '#eaa023' }} />
                            <StarIcon style={{ color: '#eaa023' }} />
                            <StarIcon style={{ color: '#eaa023' }} />
                        </li>

                    </ul>
                    <h3>javascript</h3>
                </div>
            </a>
        </div>
    )
}

export default CoursesCard
