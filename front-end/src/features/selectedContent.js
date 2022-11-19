import { createSlice } from "@reduxjs/toolkit";

export const selectedContentSlice = createSlice({
  name: "selectedContent",
  initialState: { value: { content: "" } },
  reducers: {
    onChangeContent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { onChangeContent } = selectedContentSlice.actions;
export default selectedContentSlice.reducer;
