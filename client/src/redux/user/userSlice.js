import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    currentUser : null,
    error : null ,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
         signinstart : (state) => {
            state.loading = true;
            state.error = null
         },
         signinsuccess : (state,action) => {
            state.currentUser =action.payload
            state.loading = false;
            state.error = null;
         }
         ,
         signinfailure : (state,action) => {
            state.loading = false;
            state.error = action.payload
         }
     }
})

export default userSlice.reducer

export const { signinstart , signinsuccess , signinfailure } = userSlice.actions


