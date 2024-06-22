import { createSlice } from "@reduxjs/toolkit";


export const globleSlice = createSlice({
  name: "globle",
  initialState: {
    globleItems: [],
    mailStorge:[]
  },
 
  reducers: {
    changeGlobleItems: (state, action) => {
      state.globleItems = action.payload;
    },
    sendMails: (state, action) => {
      state.mailStorge = action.payload;
    }
  },
});

export const { changeGlobleItems,sendMails} = globleSlice.actions;
export default globleSlice.reducer;
