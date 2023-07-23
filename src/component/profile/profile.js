import React, { useEffect, useState } from 'react'
import Posts from '../posts/posts'
import './profile.scss';
import userImg from '../../asset/user.png';
import { useNavigate, useParams } from 'react-router-dom';
import CreatePosts from '../createPosts/createPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slices/postSlice';
import Followbtn from '../followbtn/followbtn';
function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMyProfile, setIsMyProfile] = useState(false);
    const myProfile = useSelector(state => state.appConfigReducer.myProfile)
    const params = useParams();
    const userProfile = useSelector(state => state.postReducer.userProfile)
    // console.log(userProfile)
    const feedData = useSelector(state => state.feedDataReducer.feedData);
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        dispatch(getUserProfile({ userId: params?.userId }))
        setIsMyProfile(myProfile?._id === params?.userId)
        setIsFollowing(feedData?.followings?.find(item => item._id === params.userId));
    }, [myProfile, params.userId, feedData, dispatch])
    return (
        <div className="Profile">
            <div className="container">
                <div className="left-part">
                    {isMyProfile && <CreatePosts />}
                    {userProfile?.posts?.length == 0 ? <div className='message'> No Post Yet !! </div> : userProfile?.posts?.map(post => <Posts key={post._id} post={post} isMyProfile={isMyProfile} />)}
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img src={userProfile?.avatar?.url ? userProfile?.avatar?.url : userImg} alt="userImg" className="user-img" />
                        <h3 className="user-name">{userProfile?.name}</h3>
                        <p className='bio'>{userProfile?.bio}</p>
                        <div className="follower-info">
                            <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                            <h4>{`${userProfile?.followings?.length} Followings`}</h4>
                        </div>

                        {!isMyProfile && <Followbtn isFollowing={isFollowing} userId={params.userId} />}

                        {isMyProfile && <button className='update-profile btn-secondary' onClick={() => navigate('/updateProfile')}>Update Profile</button>}
                        {/* {!isMyProfile && !isFollowing && <button className='follow btn-primary'>Follow</button>}
                        {!isMyProfile && isFollowing && <button className='follow btn-primary'>UnFollow</button>}
                        {isMyProfile && <button className='update-profile btn-secondary' onClick={() => navigate('/updateProfile')}>Update Profile</button>} */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile