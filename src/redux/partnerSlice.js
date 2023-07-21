import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE={
    username:"",
    token:"",
    userId:""
}

export const PartnerSlice=createSlice({
    name:'partner',
    initialState:INITIAL_STATE,
    reducers:{
        updatePartner:(state,action)=>{
            state.username = action.payload.username
            state.userId = action.payload.userId
            state.token=action.payload.token
            
        }
    }
})

export const {updatePartner} =PartnerSlice.actions
export default PartnerSlice.reducer