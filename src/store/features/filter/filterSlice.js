import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchParam: "",
  selectedCategories:["10","20",],
  sort:"descPrice"
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setSearchParam } = filterSlice.actions

export default filterSlice.reducer