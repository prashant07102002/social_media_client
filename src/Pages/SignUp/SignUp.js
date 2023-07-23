import React, { useState } from 'react'
import "./SignUp.scss"
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../Utils/axiosClient';
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_FAILURE } from '../../App';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/slices/postSlice';

// import Login from '../Login/Login'
function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const result = await axiosClient.post("/auth/signup", {
                name,
                email,
                password
            })
            console.log(result);
            navigate('/login')
        } catch (e) {
            console.log("helllo", e);
            dispatch(showToast({
                type: TOAST_FAILURE,
                message: e
            }))
        }
    }
    return (
        <div className="SignUp">
            <div className="SignUp_Box">
                <h2 className="heading">SignUp</h2>
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="name" id="name" onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="Submit" className="submit" />
                </form>
                <p className="subheading">Already have an account? <Link to={"/login"}>Login</Link></p>

            </div>
        </div>
    )
}

export default SignUp   