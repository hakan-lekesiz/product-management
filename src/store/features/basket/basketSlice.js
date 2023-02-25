import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      state.items = action.payload
    },
   

  },
})

// Action creators are generated for each case reducer function
export const { addItemToBasket } = basketSlice.actions

export default basketSlice.reducer