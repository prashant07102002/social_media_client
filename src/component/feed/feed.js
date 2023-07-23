import React, { useEffect } from 'react'
import './feed.scss'
import Posts from '../posts/posts'
import Follower from '../follower/follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'
function Feed() {
    const dispatch = useDispatch();
    const feedData = useSelector(state => state.feedDataReducer.feedData)
    // console.log("feedData in feed.js", feedData)
    useEffect(() => {
        dispatch(getFeedData())
    }, [dispatch])
    return (
        <div className="Feed">
            <div className="container">
                <div className="left-part">
                    {feedData?.posts?.length == 0 ? <div className='message'>Follow user to get feed !!</div> : feedData?.posts?.map(post => <Posts key={post._id} post={post} />)}
                </div>
                <div className="right-part">
                    <div className="following">
                        <h3 className="title">You are following</h3>
                        {feedData?.followings?.map(user => <Follower key={user._id} user={user} />)}
                    </div>
                    <div className="suggesstion">
                        <h3 className="title">Suggessted for you</h3>
                        {feedData?.suggesstion?.map(user => <Follower key={user._id} user={user} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed