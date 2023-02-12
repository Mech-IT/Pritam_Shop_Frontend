import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartQuantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.products=action.payload
        },
        setTotal:(state,action)=>{
             state.total=action.payload
        },
        addCartQuantity: (state) => {
            state.cartQuantity+=1
        },
        deleteCartQuantity: (state) => {
           state.cartQuantity-=1
        },
        set: (state) => {
            state.products = [];
            state.cartQuantity = 0;
            state.total = 0;
        }
    }
})

export const { addProduct,setTotal,set,addCartQuantity,deleteCartQuantity } = cartSlice.actions
export default cartSlice.reducer;