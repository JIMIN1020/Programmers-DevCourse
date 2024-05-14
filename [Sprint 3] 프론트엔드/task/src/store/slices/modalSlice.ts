import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";

interface ModalState {
  boardId: string;
  listId: string;
  task: Task;
}

const initialState: ModalState = {
  boardId: "board-0",
  listId: "list-0",
  task: {
    taskId: "task-0",
    taskName: "task 0",
    taskDescription: "task desc",
    taskOwner: "jm",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
});

export const modalReducer = modalSlice.reducer;
