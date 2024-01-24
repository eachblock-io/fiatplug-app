import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToggleState = {
  value: boolean;
};

const initialState = {
  value: false,
} as ToggleState;

export const toggleSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    handleOpen: (state: any) => {
      state.value = !state.value;
    },
  },
});

export const { handleOpen } = toggleSlice.actions;

export default toggleSlice.reducer;
