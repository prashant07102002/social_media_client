import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../Utils/localstorageManage'
import { Navigate, Outlet } from 'react-router-dom';

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN);
    return (
        user ? <Outlet /> : <Navigate to={'/login'} />
        // <Outlet />
    )
}

export default RequireUser  