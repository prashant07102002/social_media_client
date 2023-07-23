import React, { useRef, useEffect, useState } from 'react';
import './navbar.scss';
import Avatar from '../avatar/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localstorageManage';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const bannerRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(true);
        const timerId = setTimeout(() => {
            setIsFlipped(false);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [location]); // Run the effect whenever the location changes (page navigation)

    async function handleLogoutClicked() {
        try {
            dispatch(setLoading(true));
            await axiosClient.post('/auth/logout');
            removeItem(KEY_ACCESS_TOKEN);
            navigate('/login');
            dispatch(setLoading(false));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={`Navbar ${isFlipped ? 'flipped' : ''}`}>
            <div className="container">
                <h2
                    ref={bannerRef}
                    className="banner hover-link"
                    onClick={() => navigate('/')}
                >
                    SocialNexus
                </h2>
                <div className="right-side">
                    <div className="profile hover-link" onClick={() => navigate(`/profile/${myProfile._id}`)}>
                        <Avatar src={myProfile?.avatar?.url} />
                    </div>
                    <div className="logout hover-link" onClick={handleLogoutClicked}>
                        <TbLogout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
