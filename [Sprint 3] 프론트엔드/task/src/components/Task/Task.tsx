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
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={description}>{taskDesc}</div>
    </div>
  );
}

export default Task;
