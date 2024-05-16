import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

interface ModalState {
  boardId: string;
  listId: string;
  task: ITask;
}

interface SetModalDataAction {
  boardId: string;
  listId: string;
  task: ITask;
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
  reducers: {
    setModalData: (state, { payload }: PayloadAction<SetModalDataAction>) => {
      state.boardId = payload.boardId;
      state.listId = payload.listId;
      state.task = payload.task;
    },
  },
});

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
