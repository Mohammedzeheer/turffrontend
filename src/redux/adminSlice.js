import { createSlice } from "@reduxjs/toolkit";

const AdminSlice= createSlice({
    name:"admin",
    initialState:{
        id:"",
        name:"",
        AdminToken:null
    },
    reducers:{
        AddAdmin(state,action){
            state.AdminToken = action.payload.token
        },
        AdminLogout(state,action){
            state.AdminToken =""        
        },
        changeUser:(state,action)=>{
            state.id = action.payload.id
            state.name=action.payload.name
        }
    }
})
export const {AddAdmin , changeUser} = AdminSlice.actions
export default AdminSlice.reducer
