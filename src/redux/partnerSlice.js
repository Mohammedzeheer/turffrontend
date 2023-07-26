import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE={
    partnername:"",
    token:"",
    partnerId:""
}

export const PartnerSlice=createSlice({
    name:'partner',
    initialState:INITIAL_STATE,
    reducers:{
        updatePartner:(state,action)=>{
            state.partnername = action.payload.partnername
            state.partnerId = action.payload.partnerId
            state.token=action.payload.token
            state.image=action.payload.image           
        }
    }
})

export const {updatePartner} =PartnerSlice.actions
export default PartnerSlice.reducer