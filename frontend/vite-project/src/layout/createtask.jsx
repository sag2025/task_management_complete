import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function CreateTask() {
  const navigate = useNavigate();

  const titleRef = useRef();
  const descRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();
  const categoryRef = useRef();
  const tagsRef = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: titleRef.current.value,
      description: descRef.current.value,
      due_date:new Date(dueDateRef.current.value).toISOString(),
      status: statusRef.current.value || "pending",
      category: categoryRef.current.value,
      tags: tagsRef.current.value
        ? tagsRef.current.value.split(",").map(t => t.trim())
        : []
    };
    console.log(data.category);
    console.log(data.tags);

    try {
      const res = await authFetch("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      console.log("CREATE RESPONSE:", json);

      if (!res.ok) {
        setError(json.message || "Error creating task");
        return;
      }

      setError("");
      navigate("/tasks");

    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Create Task</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          width: 500,
        }}
      >
        <input ref={titleRef} placeholder="Title" required />

        <textarea ref={descRef} placeholder="Description" required />

        <input type="datetime-local" ref={dueDateRef} required />

        <select ref={statusRef}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          ref={categoryRef}
          placeholder="Category"
        />

        <input
          ref={tagsRef}
          placeholder="Tags (comma separated)"
        />

        <button type="submit">Create Task</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateTask;