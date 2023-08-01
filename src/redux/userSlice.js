import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE={
    userId:"",
    username:"",
    image:"",
    token:"",
    email:'',
}

export const UserSlice=createSlice({
    name:'user',
    initialState:INITIAL_STATE,
    reducers:{
        updateUser:(state,action)=>{
            state.username = action.payload.username
            state.image=action.payload.image
            state.userId=action.payload.userId
            state.token=action.payload.token   
            state.email=action.payload.email      
        },
        addProfile:(state,action)=>{
            state.username = action.payload.username
            state.image=action.payload.image
            state.userId=action.payload.userId
        }, 
        logoutUser: (state) => {
            Object.assign(state, INITIAL_STATE);
        }
    }
})

export const {updateUser,addProfile,logoutUser} =UserSlice.actions
export default UserSlice.reducer


// import {createSlice} from "@reduxjs/toolkit"

// const UserAuth = createSlice({
//     name:"user",
//     initialState:{
//         userToken:null,
//         userName:null
//     },
//     reducers:{
//         userAddDetails(state,actions){
//             // console.log('auth.....',actions.payload);
//             const newItem = actions.payload;
//             state.userName =newItem.name
//             state.userToken = newItem.token 
//         },
//         userLogout(state,actions){
          
//             state.userName=""
//             state.userToken=""
//         }
//     }
// })

// export const UserActions = UserAuth.actions
// export default UserAuth