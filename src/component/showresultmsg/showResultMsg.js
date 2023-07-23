import React from 'react'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'
import { useDispatch } from 'react-redux'

function ShowResultMsg(props) {
    const dispatch = useDispatch();
    if (props.msg === 'error') {
        dispatch(showToast({
            type: TOAST_FAILURE,
            message: props.error
        }))
    }
    else {
        dispatch(showToast({
            type: TOAST_SUCCESS,
            message: props.error
        }))
    }
    return (
        <></>
    )
}

export default ShowResultMsg