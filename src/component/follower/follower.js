import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/avatar'
import './follower.scss'
import { useSelector } from 'react-redux'
// import { followAndUnfollowUser } from '../../redux/slices/feedSlice';
import { useNavigate } from 'react-router-dom';
import Followbtn from '../followbtn/followbtn';
function Follower({ user }) {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [isFollowing, setIsFollowing] = useState();
    const feedData = useSelector(state => state.feedDataReducer.feedData);
    // console.log(feedData);
    // console.log("user to follow id is", user._id)
    // console.log("is following in follower.js", isFollowing, user)
    useEffect(() => {
        setIsFollowing(feedData.followings.find(item => item._id === user._id));
    }, [feedData, user._id])
    // function handleUserFollow() {
    //     dispatch(followAndUnfollowUser({ userIdToFollow: user._id }))
    // }
    // console.log("is following in follower.js", isFollowing, user)
    return (
        <div className="Follower">
            <div className="user-info" onClick={() => navigate(`/profile/${user._id}`)}>
                <Avatar src={user?.avatar?.url} />
                <h4 className="name">{user.name ? user?.name : 'userName'}</h4>
            </div>
            {/* {console.log("is following in follower.js", isFollowing, user)} */}
            <Followbtn isFollowing={isFollowing} userId={user._id} />
            {/* <h5 className={isFollowing ? "hover-link follow-link" : "btn-primary"} onClick={handleUserFollow}>{isFollowing ? `Unfollow` : `Follow`}</h5> */}
        </div>
    )
}

export default Follower 