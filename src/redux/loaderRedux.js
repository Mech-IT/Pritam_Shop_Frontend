import {createSlice} from "@reduxjs/toolkit"

const loaderSlice=createSlice({
    name:"loader",
    initialState:{
        loaderDisplay:"",
        alertDisplay:"",
        alertResult:"",
        errMsg:""
    },
    reducers:{
      addLoaderDisplay:(state,action)=>{
        state.loaderDisplay=action.payload
    },
    addAlert:(state,action)=>{
        state.alertDisplay=action.payload.alertDisplay
        state.alertResult=action.payload.alertResult
        state.errMsg=action.payload.errMsg
    }
    }
})

export const {addLoaderDisplay,addAlert}=loaderSlice.actions
export default loaderSlice.reducer;