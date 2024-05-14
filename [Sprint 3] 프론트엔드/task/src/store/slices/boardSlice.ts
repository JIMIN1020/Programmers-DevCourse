import { createSlice } from "@reduxjs/toolkit";

interface BoardState {}

const initialState: BoardState = {
  modalActive: false,
  boardArray: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export const boardReducer = boardSlice.reducer;
