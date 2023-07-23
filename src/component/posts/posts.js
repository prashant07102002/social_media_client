import React from 'react'
import Avatar from '../avatar/avatar'
import './posts.scss'
// import backgoundImg from '../../asset/backgroundImg.jpg '
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { deletePost, getUserProfile, likeandunlikePosts } from '../../redux/slices/postSlice'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'

function Posts(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(props)
    async function handlePostLiked() {
        dispatch(likeandunlikePosts({
            postId: props.post._id
        }))
        if (props.post.isliked) {
            dispatch(showToast({
                type: TOAST_SUCCESS,
                message: 'Post Unliked'
            }))
        }
        else {
            dispatch(showToast({
                type: TOAST_SUCCESS,
                message: 'Post Liked'
            }))
        }
    }
    async function handleDeletePost() {
        try {
            await dispatch(deletePost({ postId: props.post._id }))
            dispatch(getUserProfile({ userId: props.post?.owner?._id }));
            dispatch(showToast({
                type: TOAST_SUCCESS,
                message: 'Post Deleted'
            }))


        } catch (e) {
            console.log(e)
            dispatch(showToast({
                type: TOAST_FAILURE,
                message: e
            }))
        }

    }

    return (
        <div className="Posts">
            <div className="heading" onClick={() => { navigate(`/profile/${props.post?.owner?._id}`) }}>
                <Avatar src={props.post.owner?.avatar?.url} />
                <h4>{props.post.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={props.post?.image?.url} alt="backgroundimg" />
            </div>
            <div className="footer">
                <div className="post-btns">
                    <div className="like" onClick={handlePostLiked}>
                        {props.post.isliked ? <AiFillHeart style={{ color: 'red' }} className='icon' /> : <AiOutlineHeart className='icon' />}

                        <h4>{`${props.post?.likesCount} likes`}</h4>
                    </div>
                    <div className='delete-btn' onClick={handleDeletePost}> {props.isMyProfile && <RiDeleteBin5Fill />}</div>
                </div>
                <p className="caption">{props.post?.caption}</p>
                {/* {console.log("time is ", post?.timeAgo)} */}
                <h6 className="time-ago">{props.post?.timeAgo}</h6>


            </div>
        </div>
    )
}

export default Posts