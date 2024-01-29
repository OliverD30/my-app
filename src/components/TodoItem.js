import React from "react";

const API_BASE= 'https://my-app-backend-smoky.vercel.app';

const deleteTodo = async (id, setItems) => {
  try {
    const response = await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete a task");
    }
    const data = await response.json();
    setItems((items) => items.filter((item) => item._id !== data._id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

function TodoItem({ name, id, setItems }) {
  return (
    <div className="todo">
      <div className="text">{name}</div>
      <div className="delete-todo" onClick={() => deleteTodo(id, setItems)}>
        <span>X</span>
      </div>
    </div>
  );
}

export default TodoItem;
