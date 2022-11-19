import { createSlice } from "@reduxjs/toolkit";

export const handleUpdateSlice = createSlice({
  name: "handleUpdate",
  initialState: { value: { isUpdating: false } },
  reducers: {
    onHandleUpdate: (state) => {
      state.value = !state.value;
    },
  },
});

export const { onHandleUpdate } = handleUpdateSlice.actions;
export default handleUpdateSlice.reducer;
