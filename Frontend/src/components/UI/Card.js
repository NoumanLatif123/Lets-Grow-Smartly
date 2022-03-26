import React from "react";
import {Link} from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import {pictureUrl} from "../../utils/commonMethods";
import './card.css'

const Card = ({user}) => (
    <>
    
    <div className="card">
        <div className="card-image1">
            <img src={pictureUrl(user?.picture)} alt="Avatar" className='avatar-img'/>
        </div>
        <div className="container">
            <h4><b>{user.name}</b></h4>
            <p>{user.qualification}</p>
        </div>

        <Link to='./messenger'>
            <button className="message"><BiIcons.BiMessageDetail className='fas-message'/>
                Message
            </button>
        </Link>
        <Link to='./profile'>
            <button className="profile"><ImIcons.ImProfile className='fas-profile'/>View
                Profile
            </button>
        </Link>
    </div>
    </>
);

export default Card;