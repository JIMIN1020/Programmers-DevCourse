import React, { useState } from "react";
import DropDownForm from "./DropDownForm/DropDownForm";
import { IoIosAdd } from "react-icons/io";
import { listButton, taskButton } from "./ActionButton.css";

interface Props {
  boardId: string;
  listId: string;
  list?: boolean;
}

function ActionButton({ boardId, listId, list }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const btnText = list ? "새로운 리스트 등록" : "새로운 일 등록";

  return isFormOpen ? (
    <DropDownForm
      setIsFormOpen={setIsFormOpen}
      list={list ? true : false}
      boardId={boardId}
      listId={listId}
    />
  ) : (
    <div
      className={list ? listButton : taskButton}
      onClick={() => setIsFormOpen(true)}
    >
      <IoIosAdd />
      <span>{btnText}</span>
    </div>
  );
}

export default ActionButton;
