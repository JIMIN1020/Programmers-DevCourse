import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { ChangeEvent, useState } from "react";
import {
  deleteTask,
  setModalActive,
  updateTask,
} from "../../store/slices/boardSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import {
  buttons,
  closeBtn,
  header,
  input,
  modalWindow,
  title,
  updateBtn,
  wrapper,
} from "./EditModal.css";

function EditModal() {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(editingState);

  const handleClose = () => {
    dispatch(setModalActive(false));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      task: {
        ...data.task,
        taskName: e.target.value,
      },
    }));
  };
  const handleDescChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      task: {
        ...data.task,
        taskDescription: e.target.value,
      },
    }));
  };
  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      task: {
        ...data.task,
        taskOwner: e.target.value,
      },
    }));
  };

  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 수정하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  const handleDeleteTask = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId,
      })
    );
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 삭제하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>
          <FiX className={closeBtn} onClick={handleClose} />
        </div>
        <div className={title}>제목</div>
        <input
          className={input}
          type="text"
          value={data.task.taskName}
          onChange={handleNameChange}
        />

        <div className={title}>설명</div>
        <input
          className={input}
          type="text"
          value={data.task.taskDescription}
          onChange={handleDescChange}
        />

        <div className={title}>생성한 사람</div>
        <input
          className={input}
          type="text"
          value={data.task.taskOwner}
          onChange={handleAuthorChange}
        />

        <div className={buttons}>
          <button className={updateBtn} onClick={handleUpdate}>
            수정하기
          </button>
          <button className={closeBtn} onClick={handleDeleteTask}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
