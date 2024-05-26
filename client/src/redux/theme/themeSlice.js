
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme : 'light'
}

const themeSlice = createSlice({
    name : 'theme',
    initialState ,
    reducers : {
     
        toggletheme : (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }

    }
    
})

export default themeSlice.reducer

export const { toggletheme } = themeSlice.actions