import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
  loading,
}) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");

  // BUG INTENTIONNEL: Fonction de filtrage manquante
  const getFilteredTodos = () => {
    console.log("getFilteredTodos", filter);

    let filtered = todos;

    if (filter === "completed") {
      console.log("ONLY completed");
      
      filtered = todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      filtered = todos.filter((todo) => !todo.completed);
    }

    // BUG INTENTIONNEL: Tri manquant
    // TODO: Implémenter le tri par date, priorité, etc.

    if (sortBy === "created") {
      filtered = filtered.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortBy === "priority") {
      return filtered.sort((a, b) => {
        return a.priority - b.priority;
      });
    } else if (sortBy === "dueDate") {
      filtered = filtered.sort((a, b) => {
        return new Date(b.dueDate) - new Date(a.dueDate);
      });
    }

    console.log('LISTE FILTR2', filtered);
    
    return filtered;
  };

  const handleDelete = (id) => {
    console.log("Suppression de la tâche:", id);
    onDeleteTodo(id);
  };

  const handleUpdate = (id, updatedData) => {
    console.log("Modification de la tâche:", id, updatedData);
    onUpdateTodo(id, updatedData);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Chargement des tâches...</div>
      </div>
    );
  }

  const filteredTodos = getFilteredTodos();

  return (
    <div className="card">
      <div className="todo-list-header">
        <h2>Liste des Tâches ({filteredTodos.length})</h2>

        <div className="todo-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes</option>
            <option value="pending">En cours</option>
            <option value="completed">Terminées</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="created">Date de création</option>
            <option value="priority">Priorité</option>
            <option value="dueDate">Date d'échéance</option>
          </select>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <p>Aucune tâche trouvée</p>
        </div>
      ) : (
        <div className="todo-items">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
