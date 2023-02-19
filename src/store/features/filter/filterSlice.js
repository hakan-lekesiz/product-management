import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchParam: ""
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setSearchParam } = filterSlice.actions

export default filterSlice.reducer