import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types";

interface BoardState {
  modalActive: boolean;
  boardArray: Board[];
}

const initialState: BoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫 번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescription: "task desc",
              taskOwner: "jm",
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescription: "task desc",
              taskOwner: "jm3",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-3",
              taskName: "Task 4",
              taskDescription: "task desc",
              taskOwner: "jm2",
            },
            {
              taskId: "task-4",
              taskName: "Task 5",
              taskDescription: "task desc",
              taskOwner: "jm4",
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export const boardReducer = boardSlice.reducer;
