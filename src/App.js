import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import Feed from "./component/feed/feed";
import RequireUser from "./component/requireUser";
import Profile from "./component/profile/profile";
import UpdateProfile from "./component/updateprofile/updateProfile";
import { useSelector } from "react-redux";
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useRef } from "react";
import OnlyIfNotLoggedIn from "./component/onlyIfNotLoggedIn";
import toast, { Toaster } from 'react-hot-toast';
export const TOAST_SUCCESS = 'toast_success';
export const TOAST_FAILURE = 'toast_failure';

function App() {
	const isLoading = useSelector(state => state.appConfigReducer.isLoading)
	const toastData = useSelector(state => state.appConfigReducer.toastData)
	const loadingRef = useRef(null)
	useEffect(() => {
		if (isLoading) {
			loadingRef.current?.continuousStart();
		}
		else {
			loadingRef.current?.complete();
		}
	}, [isLoading])

	useEffect(() => {
		switch (toastData?.type) {
			case TOAST_SUCCESS:
				toast.success(toastData?.message);
				break;
			case TOAST_FAILURE:
				toast.error(toastData?.message);
				break;
		}
	}, [toastData])

	return (
		<div className="App">
			<LoadingBar color='#5f9fff' ref={loadingRef} />
			<div><Toaster /></div>
			<Routes>
				<Route element={<RequireUser />}>
					<Route element={<Home />} >
						<Route path="/" element={<Feed />} />
						<Route path="/profile/:userId" element={<Profile />} />
						<Route path="/updateProfile" element={<UpdateProfile />} />
					</Route>
				</Route>
				<Route element={<OnlyIfNotLoggedIn />} >
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Route >
			</Routes>
		</div>
	);
}

export default App;
