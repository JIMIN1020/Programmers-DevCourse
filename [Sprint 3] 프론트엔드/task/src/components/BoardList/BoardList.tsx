import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import clsx from "clsx";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import { GoSignOut } from "react-icons/go";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

interface Props {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

function BoardList({ activeBoardId, setActiveBoardId }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const boards = useTypedSelector((state) => state.board.boardArray);
  const auth = getAuth(app);
  const authProvider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, authProvider).then((userCredential) => {
      //
    });
  };

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

        <GoSignOut className={addButton} />
        <FiLogIn className={addButton} onClick={handleLogin} />
      </div>
    </div>
  );
}

export default BoardList;
