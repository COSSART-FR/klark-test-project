import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState([]);

  console.log(todos);

  const [loading, setLoading] = useState(undefined);

  const [error, setError] = useState(undefined);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();

      if (!data) {
        return;
      }

      const todosList = data.slice(0, 5).map((data) => ({
        ...data,
        description: "",
        priority: "medium",
        dueDate: "",
        createdAt: new Date(),
      }));

      setTodos(todosList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (todo) => {
    //console.log("addTodo");

    const newTodo = {
      ...todo,
      id: Date.now(),
      completed: false,
      createdAt: new Date(),
    };
    //todos.push(newTodo);
    //console.log([...todos, newTodo]);

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      setTodos([...todos]);
    }
  };

  const deleteTodo = (id) => {
    const newList = todos.filter((data) => data.id !== id);
    setTodos(newList);
  };

  const updateTodo = (id, updatedData) => {
    console.log("id", id);
    console.log("updatedData", updatedData);

    const todoToDelete = todos.find((data) => data.id === id);
    const newList = todos.filter((data) => data.id !== id);
    
    setTodos([...newList, { ...todoToDelete, ...updatedData }]);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App - Test Technique</h1>
        <p>Trouvez et corrigez les bugs !</p>
      </header>

      <main className="App-main">
        <TodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />

        <TodoStats todos={todos} />
      </main>
    </div>
  );
}

export default App;
