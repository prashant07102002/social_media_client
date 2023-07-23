// import React, { useEffect } from 'react'
// import { axiosClient } from '../../Utils/axiosClient';
import { Outlet } from 'react-router-dom';
import Navbar from '../../component/navbar/navbar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMyInfo } from '../../redux/slices/appConfigSlice';

function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMyInfo());
	}, [dispatch])
	return <>
		<Navbar />
		<div className='Outlet'>
			<Outlet />
		</div>

	</>
}

export default Home