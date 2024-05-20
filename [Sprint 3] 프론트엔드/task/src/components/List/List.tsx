import React from "react";
import { IList, ITask } from "../../types";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  list: IList;
  boardId: string;
}

function List({ list, boardId }: Props) {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={listWrapper}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract
              className={deleteButton}
              onClick={() => handleListDelete(list.listId)}
            />
          </div>

          {list.tasks.map((task, i) => (
            <div
              key={task.taskId}
              onClick={() => handleTaskChange(boardId, list.listId, task)}
            >
              <Task
                taskName={task.taskName}
                taskDesc={task.taskDescription}
                boardId={boardId}
                id={task.taskId}
                index={i}
              />
            </div>
          ))}
          {provided.placeholder}
          <ActionButton boardId={boardId} listId={list.listId} />
        </div>
      )}
    </Droppable>
  );
}

export default List;
