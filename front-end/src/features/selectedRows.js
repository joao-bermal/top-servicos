import { createSlice } from "@reduxjs/toolkit";

export const selectedRowsSlice = createSlice({
  name: "selectedRows",
  initialState: { value: { row: [] } },
  reducers: {
    onChangeSelection: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { onChangeSelection } = selectedRowsSlice.actions;
export default selectedRowsSlice.reducer;
