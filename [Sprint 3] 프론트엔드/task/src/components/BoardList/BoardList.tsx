import React, { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
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
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase";
import { deleteUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

function BoardList({ activeBoardId, setActiveBoardId }: Props) {
  const dispatch = useTypedDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const boards = useTypedSelector((state) => state.board.boardArray);
  const auth = getAuth(app);
  const authProvider = new GoogleAuthProvider();

  const { isAuth } = useAuth();

  const handleLogin = () => {
    signInWithPopup(auth, authProvider)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(deleteUser());
      })
      .catch((err) => {
        console.log(err);
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
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleLogOut} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default BoardList;
