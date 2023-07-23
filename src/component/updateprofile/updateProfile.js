import React, { useEffect, useState } from 'react'
import userdummyImg from '../../asset/user.png'
import './updateProfile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, showToast, updateMyProfile } from '../../redux/slices/appConfigSlice';
import { useNavigate } from 'react-router-dom';
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localstorageManage';
import { axiosClient } from '../../Utils/axiosClient';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App';
function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userImg, setUserImg] = useState('');
    useEffect(() => {
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setUserImg(myProfile?.avatar?.url || '')
    }, [myProfile])
    function handleImageChange(e) {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                if (fileReader.readyState === fileReader.DONE) {
                    setUserImg(fileReader.result)
                    // console.log('img data is ', fileReader.result);
                }
            }
        }

    }
    async function handleSubmit(e) {
        e.preventDefault();
        await dispatch(updateMyProfile({
            name,
            bio,
            userImg
        }))
        if (myProfile) {
            dispatch(showToast({
                type: TOAST_SUCCESS,
                message: 'Profile Updated'
            }))
        }
        else {
            dispatch(showToast({
                type: TOAST_FAILURE,
                message: myProfile
            }))
        }
    }
    async function handleDelete() {
        // dispatch(deleteMyProfile())
        dispatch(setLoading(true))
        const response = await axiosClient.delete('/user/')
        removeItem(KEY_ACCESS_TOKEN)
        dispatch(showToast({
            type: TOAST_SUCCESS,
            message: response.result
        }))
        navigate('/login')
        dispatch(setLoading(false));
    }
    return (
        <div className="UpdateProfile">
            <div className="container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label htmlFor="inputImg" className='labelImg'>
                            <img src={userImg ? userImg : userdummyImg} alt={name} />
                        </label>
                        <input type="file" className='inputImg' id='inputImg' accept='image/*' onChange={handleImageChange} />
                    </div>
                </div>
                <div className="right-part">
                    <form action="" onSubmit={handleSubmit}>
                        <h2>Your Details</h2>
                        <input value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        <input value={bio} type="text" placeholder='Your Bio' onChange={(e) => setBio(e.target.value)} />
                        <input type="submit" className='btn-primary' onClick={handleSubmit} />
                    </form>
                    <button className="delete-account btn-primary" onClick={handleDelete}>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile