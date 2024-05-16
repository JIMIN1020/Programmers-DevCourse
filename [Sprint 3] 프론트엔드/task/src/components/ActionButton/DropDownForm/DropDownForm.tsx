import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch } from "../../../hooks/redux";
import { addList, addTask } from "../../../store/slices/boardSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import {
  button,
  buttons,
  close,
  input,
  listForm,
  taskForm,
} from "./DropDownForm.css";

interface Props {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
  listId: string;
  boardId: string;
}

function DropDownForm({ list, listId, boardId, setIsFormOpen }: Props) {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState<string>("");
  const formPlaceholder = list
    ? "리스트의 제목을 입력하세요"
    : "일의 제목을 입력하세요";
  const btnTitle = list ? "리스트 추가하기" : "일 추가하기";

  const handleBtnClick = () => {
    if (text.trim()) {
      // 리스트 추가하는 경우
      if (list) {
        dispatch(
          addList({
            boardId,
            list: { listId: uuidv4(), listName: text, tasks: [] },
          })
        );
        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `리스트 생성하기: ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now()),
          })
        );
      }
      // 일 추가하는 경우
      else {
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              taskId: uuidv4(),
              taskName: text,
              taskDescription: "",
              taskOwner: "User",
            },
          })
        );
        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `일 생성하기: ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now()),
          })
        );
      }
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setIsFormOpen(false)}
        placeholder={formPlaceholder}
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleBtnClick}>
          {btnTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
}

export default DropDownForm;
