import { useState } from "react";

let id = 0;

type TodoItem = {
  id: number;
  label: string;
  isCompleted: boolean;
};

function ToDoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    const value = inputText.trim();
    if (value.length > 0) {
      const newTodo = { id: ++id, label: value, isCompleted: false };
      setTodos((prev) => [...prev, newTodo]);
      setInputText("");
    }
  };

  const toggleTodoCompleteStatus = (targetId: number) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === targetId) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        } else {
          return item;
        }
      })
    );
  };

  const deleteTodo = (targetId: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== targetId));
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={handleOnInputChange}
        placeholder="Enter todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <List
        todos={todos}
        toggleTodoCompleteStatus={toggleTodoCompleteStatus}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

function List({
  todos,
  toggleTodoCompleteStatus,
  deleteTodo,
}: {
  todos: TodoItem[];
  toggleTodoCompleteStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
}) {
  return (
    <div>
      {todos.map((item) => (
        <TodoListItem
          todo={item}
          key={item.id}
          toggleTodoCompleteStatus={toggleTodoCompleteStatus}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

function TodoListItem({
  todo,
  toggleTodoCompleteStatus,
  deleteTodo,
}: {
  todo: TodoItem;
  toggleTodoCompleteStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
}) {
  const { id, label, isCompleted } = todo;

  const handleOnChange = () => {
    toggleTodoCompleteStatus(id);
  };

  const handleOnPressDelete = () => {
    deleteTodo(id);
  };

  return (
    <div>
      <input type="checkbox" checked={isCompleted} onChange={handleOnChange} />
      <span
        style={{
          color: isCompleted ? "black" : "blue",
          textDecorationLine: isCompleted ? "line-through" : "none",
        }}
      >
        {id} {label}{" "}
      </span>
      <button onClick={handleOnPressDelete}>Delete</button>
    </div>
  );
}

export default ToDoList;
