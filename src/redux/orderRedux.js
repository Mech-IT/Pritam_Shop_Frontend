import {createSlice} from "@reduxjs/toolkit"

const orderSlice=createSlice({
    name:"order",
    initialState:{
        product:[],
        orderQuantity:0,
        orderId:"",
        totalRePay:0,
    },
    reducers:{
        addOrderProduct:(state,action)=>{
            state.orderQuantity +=1;
            state.product=action.payload;
        },
        addOrderId:(state,action)=>{
           state.orderId=action.payload
        },
        orderRePay:(state,action)=>{
           state.totalRePay=action.payload 
        },
      
    }
})

export const {addOrderProduct,addOrderId,orderRePay}=orderSlice.actions
export default orderSlice.reducer;