import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";

interface Props {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideForm({ setIsFormOpen }: Props) {
  const dispatch = useTypedDispatch();
  const [value, setValue] = useState<string>("");

  const handleClick = () => {
    // board 추가
    if (value.trim()) {
      dispatch(
        addBoard({ board: { boardId: uuidv4(), boardName: value, lists: [] } })
      );
    }

    // log 추가
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `게시판 등록: ${value}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );

    setIsFormOpen((prev) => !prev);
  };

  return (
    <div className={sideForm}>
      <input
        className={input}
        autoFocus
        type="text"
        value={value}
        placeholder="새로운 게시판 등록하기"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setIsFormOpen(false)}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
}

export default SideForm;
