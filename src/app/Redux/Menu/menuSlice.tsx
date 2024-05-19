import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: boolean;
}

const initialState: CounterState = {
  value: true,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setOpen: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true;
    },
    setClose: (state) => {
      state.value = false;
    },
    toggleClose: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setClose, setOpen, toggleClose } = counterSlice.actions;

export default counterSlice.reducer;
