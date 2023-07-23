import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localstorageManage";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../../App";
import { useDispatch } from "react-redux";
function Login() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axiosClient.post("/auth/login", {
                email,
                password
            })
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken)
            navigate('/');
            console.log(response);
        } catch (error) {
            console.log(error);
            dispatch(showToast({
                type: TOAST_FAILURE,
                message: error
            }))
        }
    }
    return (
        <div className="Login">
            <div className="Login_Box">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="Submit" className="submit" />
                </form>
                <p className="subheading">Do not have an account? <Link to={"/signup"}>SignUp</Link></p>
            </div>
        </div>
    )
}
export default Login