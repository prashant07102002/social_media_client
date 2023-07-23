import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfigSlice";
export const getUserProfile = createAsyncThunk('user/getUserProfile', async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('/user/getUserProfile', body);
        console.log('the response is ', response.result)

        return response.result;
    } catch (e) {
        return Promise.reject(e)
    }
    finally {
        thunkAPI.dispatch(setLoading(false));
    }
})

export const likeandunlikePosts = createAsyncThunk('posts/like', async (body, thunkAPI) => {
    try {
        // console.log("the body in getUsr profile", body)
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('/posts/like', body);
        // console.log('the response is ', response.result)
        return response.result.post;
    } catch (e) {
        return Promise.reject(e)
    }
    finally {
        thunkAPI.dispatch(setLoading(false));
    }
})
export const deletePost = createAsyncThunk('posts/delete', async (body, thunkAPI) => {
    try {
        // console.log("the body in getUsr profile", body)
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.delete('/posts/', { data: body });
        console.log('the response is ', response.result)
        return response.result;
    } catch (e) {
        return Promise.reject(e)
    }
    finally {
        thunkAPI.dispatch(setLoading(false));
    }
})
const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        userProfile: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
        })
            .addCase(likeandunlikePosts.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state?.userProfile?.posts?.findIndex(item =>
                    item._id === post._id);
                if (index !== undefined && index !== -1) {
                    state.userProfile.posts[index] = post;
                }
            })

    }
})
export default postSlice.reducer;