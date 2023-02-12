import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
       currentUser:null,
       isFetching:false,
       name:"",
       userImage:"",
       error:false,
       width:0,
       stayUser:null,
    },
    reducers:{
        loginStart:(state)=>{
          state.isFetching=true;
          state.width=100
        },
        loginSuccess:(state,action)=>{
          state.isFetching=false;
          state.width=0;
          state.currentUser=action.payload
        },
        loginFailure:(state)=>{
           state.error=true;
           state.isFetching=false;
           state.width=0
        },
        loginFailureReset:(state)=>{
          state.error=false;
        },
        logoutSuccess:(state,action)=>{
          state.isFetching=false;
          state.currentUser=action.payload;
          state.error=false;
          state.width=0
        },
        keepUser:(state,action)=>{
          state.stayUser=action.payload
        },
        reset:(state)=>{
          state.stayUser=null;
          state.currentUser=null;
          state.name="";
          state.userImage=""
        },
        setName:(state,action)=>{
          state.name=action.payload;
        },
        setImage:(state,action)=>{
          state.userImage=action.payload
        }
       

    }
})

export const {loginStart,loginSuccess,loginFailure,logoutSuccess,loginFailureReset,keepUser,reset,setName,setImage}=userSlice.actions
export default userSlice.reducer;