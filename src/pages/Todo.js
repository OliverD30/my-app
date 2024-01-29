import React, { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";

const API_BASE = 'https://my-app-backend-smoky.vercel.app';

function TodoComponent() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddItem = async () => {
    if (!input.trim()) {
      return; // Prevent adding empty tasks
    }
    try {
      await fetch(`${API_BASE}/new`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ name: input })
      });
      await getTodos();
      setInput('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const getTodos = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>
      <div className="form">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter task..."
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
      <div className="todolist">
        {items.map((item) => (
          <TodoItem
            key={item._id}
            name={item.name}
            id={item._id}
            setItems={setItems}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoComponent;
