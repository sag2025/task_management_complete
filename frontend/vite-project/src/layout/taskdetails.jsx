import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function TaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await authFetch(`http://localhost:3000/api/tasks/${id}`);
        const data = await res.json();

        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <h3>Loading task...</h3>;
  if (!task) return <h3>Task not found</h3>;

  return (
    <div style={{ padding: 100,border:"10px solid red" }}>
      <h2>Task Details</h2>

      <p >
        <strong>Title:</strong>
        <span style={{ marginLeft: 10 }}>{task.title}</span>
      </p>

      <p>
        <strong>Description:</strong>
        <span style={{ marginLeft: 10 }}>{task.description}</span>
      </p>

      <p>
        <strong>Status:</strong>
        <span style={{ marginLeft: 10 }}>{task.status}</span>
      </p>

      <p>
        <strong>Due Date:</strong>
        <span style={{ marginLeft: 10 }}>
          {task.due_date
            ? new Date(task.due_date).toLocaleString()
            : "No due date"}
        </span>
      </p>

      <p>
        <strong>Category:</strong>
        <span style={{ marginLeft: 10 }}>
          {task.category || "None"}
        </span>
      </p>

      <p>
        <strong>Tags:</strong>
        <span style={{ marginLeft: 10 }}>
          {task.tags && task.tags.length > 0
            ? task.tags.map((tag, i) => (
                <span key={i} style={{ marginRight: 8 }}>
                  #{tag}
                </span>
              ))
            : "No tags"}
        </span>
      </p>

      <p>
        <strong>Created At:</strong>
        <span style={{ marginLeft: 10 }}>
          {new Date(task.created_at).toLocaleString()}
        </span>
      </p>

      <p>
        <strong>Updated At:</strong>
        <span style={{ marginLeft: 10 }}>
          {new Date(task.updated_at).toLocaleString()}
        </span>
      </p>
    </div>
  );
}

export default TaskDetails;