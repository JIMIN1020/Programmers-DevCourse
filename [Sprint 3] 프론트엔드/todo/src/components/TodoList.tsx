import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TodoModal from "./TodoModal";
export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

function TodoList() {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "공부하기", isDone: false },
    { id: 2, text: "운동하기", isDone: false },
    { id: 3, text: "독서하기", isDone: false },
  ]);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [selected, setSelected] = useState<Todo | null>(null);

  /* ----- todo 클릭 핸들러 ----- */
  const handleClickTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, isDone: !data.isDone } : data
      )
    );
  };
  /* ----- todo 추가 핸들러 ----- */
  const handleAddTodo = () => {
    if (newTodo.trim().length === 0) {
      return;
    }

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: newTodo, isDone: false },
    ]);
    setNewTodo("");
  };

  /* ----- todo 삭제 핸들러 ----- */
  const handleDeleteTodo = (id: number) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  /* ----- todo 상세 모달 오픈 핸들러 ----- */
  const handleClickDetail = (todo: Todo) => {
    setSelected(todo);
    setOpenDetail(true);
  };

  return (
    <div className="todo-container">
      <h1>오늘 할 일</h1>
      <div className="todo-list">
        <div className="input">
          <input
            type="text"
            value={newTodo}
            placeholder="할일 입력"
            onChange={(e) => setNewTodo(e.target.value)}
            style={{ marginRight: "10px", writingMode: "horizontal-tb" }}
          />
          <Button variant="primary" onClick={handleAddTodo}>
            추가
          </Button>
        </div>
        <div className="board">
          {todos.map((todo) => {
            return (
              <div key={todo.id} className="todo">
                <div className="todo-name">
                  <input
                    type="checkbox"
                    onChange={() => handleClickTodo(todo.id)}
                  />
                  <span onClick={() => handleClickDetail(todo)}>
                    {todo.isDone ? <del>{todo.text}</del> : todo.text}
                  </span>
                </div>
                <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
              </div>
            );
          })}
        </div>
      </div>
      <TodoModal
        todo={selected}
        show={openDetail}
        onHide={() => setOpenDetail(false)}
      />
    </div>
  );
}

export default TodoList;
