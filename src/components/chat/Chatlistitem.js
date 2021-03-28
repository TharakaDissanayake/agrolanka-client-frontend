import React, { useState, useEffect } from 'react'
import './Chatlistitem.css';
import MailIcon from '@material-ui/icons/Mail';
function Chatlistitem({ onClick, active, data }) {
    const [time, setTime] = useState('');
    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
     
    }, [data])
    return (
        <div className={`chatlistitem ${active ? 'active' : ''}`} onClick={onClick}>
            <img className="chatlistitem--avatar" src={data.image} alt="" />
            <div className="chatlistitem--lines">
                <div className="chatlistitem--line">
                    <div className="chatlistitem--name">{data.title}</div>
                   {data.lastMessageSeen===false && data.sender===false && <div className="chatlistitem--date">Unread<MailIcon/></div>}
                </div>
                <div className="chatlistitem--line">
                    <div className="chatlistitem--lastmsg">
                        <p>{data.lastMessage}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Chatlistitem
