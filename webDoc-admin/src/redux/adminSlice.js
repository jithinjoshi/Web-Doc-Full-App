import {createSlice} from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        admin:null
    },
    reducers:{
        login:((state,action)=>{
            state.admin = action.payload
        }),
        logout:(state)=>{
            state.admin = null
        }
    }
})

export const {login,logout} = adminSlice.actions;
export const selectAdmin = (state) => state.admin?.admin
export default adminSlice.reducer;
