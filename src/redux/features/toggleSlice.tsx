import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToggleState = {
  value: boolean;
};

const initialState = {
  value: false,
} as ToggleState;

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.value = true;
    },
  },
});

export const { handleOpen } = toggleSlice.actions;

export default toggleSlice.reducer;
