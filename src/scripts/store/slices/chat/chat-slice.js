import {createSlice} from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: 'appReducer',
    initialState: {
        me:null
    },
    reducers: {
        setMe: (state, action) => {
            state.me = action.payload;
        },


    },
});

export const {setMe } = chatSlice.actions;

export default chatSlice.reducer;
