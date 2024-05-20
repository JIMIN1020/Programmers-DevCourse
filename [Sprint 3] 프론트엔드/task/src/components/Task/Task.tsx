import { Draggable } from "react-beautiful-dnd";
import { container, description, title } from "./Task.css";

interface Props {
  taskName: string;
  taskDesc: string;
  index: number;
  id: string;
  boardId: string;
}

function Task({ taskName, taskDesc, index, id, boardId }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={container}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDesc}</div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
