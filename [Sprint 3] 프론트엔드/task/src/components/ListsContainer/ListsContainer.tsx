import { IList } from "../../types";
import List from "../List/List";
import ActionButton from "../ActionButton/ActionButton";
import { listsContainer } from "./ListsContainer.css";

interface Props {
  lists: IList[];
  boardId: string;
}

function ListsContainer({ boardId, lists }: Props) {
  return (
    <div className={listsContainer}>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton boardId={boardId} listId="" list />
    </div>
  );
}

export default ListsContainer;
