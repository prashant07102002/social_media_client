import React from 'react'
import { followAndUnfollowUser, getFeedData } from '../../redux/slices/feedSlice'
import { useDispatch } from 'react-redux'
import './followbtn.scss'
function Followbtn(props) {
    const dispatch = useDispatch();
    // console.log("in follow btn ", props.userId)
    async function handleUserFollow() {
        await dispatch(followAndUnfollowUser({ userIdToFollow: props.userId }))
        dispatch(getFeedData());
    }
    return (
        <h5 className={(props.isFollowing) ? "btn-secondary" : "btn-primary"} onClick={handleUserFollow}>{props.isFollowing ? `Unfollow` : `Follow`}</h5>
    )
}

export default Followbtn