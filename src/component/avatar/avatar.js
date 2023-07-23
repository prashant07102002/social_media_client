import React from 'react'
import userImg from '../../asset/user.png'
import "./avatar.scss";
function Avatar({ src }) {
    return (
        <div className="Avatar">
            <img src={src ? src : userImg} alt="userimage" />
        </div>
    )
}

export default Avatar