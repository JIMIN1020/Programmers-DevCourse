import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

interface BoardState {
  modalActive: boolean;
  boardArray: IBoard[];
}

interface AddBoardAction {
  board: IBoard;
}

interface DeleteListAction {
  boardId: string;
  listId: string;
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
  reducers: {
    addBoard: (state, { payload }: PayloadAction<AddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    deleteList: (state, { payload }: PayloadAction<DeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const { addBoard, deleteList, setModalActive } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
