import React, { useState } from "react";
interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "공부하기", isDone: false },
    { id: 2, text: "운동하기", isDone: false },
    { id: 3, text: "독서하기", isDone: false },
  ]);

  const handleClickTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, isDone: !data.isDone } : data
      )
    );
  };

  return (
    <div>
      <h1>오늘 할 일</h1>
      <p></p>
      <div className="todo-container">
        <div className="board">
          <ul>
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    onChange={() => handleClickTodo(todo.id)}
                  />
                  <span>
                    {todo.isDone ? <del>{todo.text}</del> : todo.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
