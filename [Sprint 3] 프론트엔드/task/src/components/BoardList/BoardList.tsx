import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";
import clsx from "clsx";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";

interface Props {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

function BoardList({ activeBoardId, setActiveBoardId }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const boards = useTypedSelector((state) => state.board.boardArray);

  return (
    <div className={container}>
      <div className={title}>게시판: </div>
      {boards.map((board, i) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(board.boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boards.findIndex((b) => b.boardId === activeBoardId) === i,
            },
            {
              [boardItem]:
                boards.findIndex((b) => b.boardId === activeBoardId) !== i,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle
            className={addButton}
            onClick={() => setIsFormOpen((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}

export default BoardList;
