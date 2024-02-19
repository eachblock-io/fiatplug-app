import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToggleState = {
  value: boolean;
  preview: boolean;
};

const initialState = {
  value: true,
  preview: false,
} as ToggleState;

export const toggleSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    handleOpen: (state: any) => {
      state.value = !state.value;
    },
    handleOpenPreview: (state: any) => {
      state.preview = true;
    },
    handleClosePreview: (state: any) => {
      state.preview = false;
    },
  },
});

export const { handleOpen, handleOpenPreview, handleClosePreview } =
  toggleSlice.actions;

export default toggleSlice.reducer;
