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
         } ,
         updatestart : (state) => {
            state.loading = true;
            state.error = null
         } ,
         updatesuccess : (state,action) => {
            state.currentUser =action.payload
            state.loading = false;
            state.error = null;
         },

         updatefailure : (state,action) => {
            state.loading = false;
            state.error = action.payload
         } ,
         deleteuserstart : (state) => {
            state.loading = true;
            state.error = null
         } ,

         deleteusersuccess : (state) => {
            state.loading = false
            state.currentUser = null
            state.error = null
         } ,

         deleteuserfailure : (state,action) => {
             state.loading = false
             state.error = action.payload
         } ,
         signoutSuccess : (state) => {
            state.currentUser = null
            state.loading = false
            state.error = false
         }
     }
})

export default userSlice.reducer

export const { signinstart , signinsuccess , signinfailure , updatestart , updatesuccess , updatefailure ,
   deleteuserstart , deleteusersuccess , deleteuserfailure , signoutSuccess
 } = userSlice.actions


