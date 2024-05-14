import { createSlice } from "@reduxjs/toolkit";
import { LogItem } from "../../types";

interface LogState {
  logArray: LogItem[];
}

const initialState: LogState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {},
});

export const loggerReducer = loggerSlice.reducer;
