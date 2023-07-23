import React, { useState } from 'react'
import Avatar from '../avatar/avatar'
// import userImg from '../../asset/user.png'
import './createPosts.scss'
// import backgroundImg from '../../asset/backgroundImg.jpg'
import { BsCardImage } from 'react-icons/bs'
import { axiosClient } from '../../Utils/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, showToast } from '../../redux/slices/appConfigSlice'
import { getUserProfile } from '../../redux/slices/postSlice'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'
function CreatePosts() {
    const [postImg, setPostImg] = useState('');
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    // console.log(myProfile);
    function handleImageChange(e) {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                if (fileReader.readyState === fileReader.DONE) {
                    setPostImg(fileReader.result)
                    // console.log('img data is ', fileReader.result);
                }
            }
        }
    }
    async function handlePostSubmit() {
        try {
            dispatch(setLoading(true));
            const result = await axiosClient.post('/posts/', {
                postImg,
                caption,
            });
            console.log(result)
            if (result) {
                dispatch(showToast({
                    type: TOAST_SUCCESS,
                    message: 'Post Created'
                }))
            }
            console.log("you posted a post", result)
            dispatch(getUserProfile({ userId: myProfile._id }));
        } catch (e) {
            dispatch(showToast({
                type: TOAST_FAILURE,
                message: e
            }))
            console.log(e);
        }
        finally {
            dispatch(setLoading(false));
            setCaption('');
            setPostImg('');
        }
    }
    return (
        <div className="CreatePosts">
            <div className="left-part">
                <Avatar src={myProfile?.avatar?.url} />
            </div>
            <div className="right-part">
                <input value={caption} type="text" className="captionInput" placeholder="what's on you mind!" onChange={(e) => setCaption(e.target.value)} />
                {postImg && <div className="img-container">
                    <img className='post-img' src={postImg} alt="post-img" />
                </div>}
                <div className="bottom-part">
                    <div className="input-post-img">
                        <label htmlFor="inputImg" className='labelImg'>
                            <BsCardImage />
                        </label>
                        <input type="file" className='inputImg' id='inputImg' accept='image/*' onChange={handleImageChange} />
                    </div>
                    <button className="post-btn btn-primary" onClick={handlePostSubmit}>Post</button>
                </div>
            </div>
        </div>
    )
}
export default CreatePosts