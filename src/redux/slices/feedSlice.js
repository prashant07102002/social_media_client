import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeandunlikePosts } from "./postSlice";

export const getFeedData = createAsyncThunk('user/getFeedData', async (_, thunkAPI) => {
    try {
        // console.log("the body in getUsr profile", body)
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('/user/getFeedData');
        // console.log('the response is ', response)
        return response.result;
    } catch (e) {
        return Promise.reject(e)
    }
    finally {
        thunkAPI.dispatch(setLoading(false));
    }
})

export const followAndUnfollowUser = createAsyncThunk('user/follow', async (body, thunkAPI) => {
    try {
        // console.log("the body in getUsr profile", body)
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('/user/follow', body);
        console.log('the response is ', response)
        return response.result.user;
    } catch (e) {
        return Promise.reject(e)
    }
    finally {
        thunkAPI.dispatch(setLoading(false));
    }
})
const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
        feedData: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled, (state, action) => {
            state.feedData = action.payload
        })
            .addCase(likeandunlikePosts.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state?.feedData?.posts?.findIndex(item =>
                    item._id === post._id);
                if (index !== undefined && index !== -1) {
                    state.feedData.posts[index] = post;
                }
            })
            .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
                const user = action.payload;
                // console.log(user);
                // console.log("user id is", user._id)
                const index = state?.feedData?.followings?.findIndex(item => item._id === user._id)
                // console.log('index is ', index)
                if (index !== -1) {
                    state?.feedData?.followings?.splice(index, 1)
                    // console.log("after removing ", JSON.stringify(state.feedData.followings))
                }
                else {
                    state?.feedData?.followings?.push(user);
                    // console.log("after pushing ", JSON.stringify(state.feedData.followings));
                }
            })

    }
})
export default feedSlice.reducer;