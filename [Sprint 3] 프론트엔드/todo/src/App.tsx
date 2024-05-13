import Clock from "components/Clock";
import TodoList from "components/TodoList";

function App() {
  return (
    <div className="container">
      <TodoList />
      <Clock />
    </div>
  );
}

export default App;
