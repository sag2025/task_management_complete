import React, { useEffect, useState } from "react";
import TaskCard from "../utils/TaskCards";
import { authFetch } from "../services/authFetch";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  // =========================
  // FETCH TASKS
  // =========================
  const fetchTasks = async (filters = {}) => {
    try {
      let url = "http://localhost:3000/api/tasks";
      const params = new URLSearchParams();

      if (filters.category) {
        params.append("category", filters.category);
      }

      if (filters.tags) {
        params.append("tags", filters.tags);
      }

      const finalUrl = params.toString()
        ? `${url}?${params.toString()}`
        : url;

      const res = await authFetch(finalUrl);
      const data = await res.json();

      console.log("TASK RESPONSE:", data);

      const taskList = Array.isArray(data)
        ? data
        : data?.tasks || [];

      setTasks(taskList);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // FILTER SUBMIT
  // =========================
  const handleFilterSubmit = (e) => {
    e.preventDefault();

    fetchTasks({
      category: category.trim(),
      tags: tags.trim(),
    });
  };

  const create_new_task = () => {
    navigate("/createtasks");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Loading your tasks...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: 20}}>
      <h2>Your Tasks</h2>

      {/* ================= FILTER UI ================= */}
      <form
        onSubmit={handleFilterSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: 300,
          marginBottom: 20,
        }}
      >
        <input style={{height:30 }}
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input style={{height:30 }}
          placeholder="Filter by tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit" style={{height:30}}>Apply Filters</button>
      </form>

      {/* ================= TASK LIST ================= */}
      {tasks.length === 0 ? (
        <h3>No tasks found</h3>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}

      {/* CREATE BUTTON */}
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button onClick={create_new_task}>+ Create New Task</button>
      </div>
    </div>
  );
}

export default Tasks;