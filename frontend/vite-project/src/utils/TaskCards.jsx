import React from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleUpdate = () => {
    navigate(`/tasks/${task.id}/edit`);
  };

  const handleaddtags=()=>{
    navigate(`/tasks/${task.id}/edit`);
  }
  const handleaddcategory=()=>{
    navigate(`/tasks/${task.id}/edit`);
  }

  const handleDelete = async () => {
    try {
      const res = await authFetch(
        `http://localhost:3000/api/tasks/${task.id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        border: "2px solid red",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        width: 320,
      }}
    >
      <h3>{task.title}</h3>

      <p>
        STATUS: <b>{task.status}</b>
      </p>

      <p>
        CATEGORY:{" "}
        <b>{task.category ? task.category : "None"}</b>
      </p>

      <p>
        TAGS:{" "}
        <b>
          {Array.isArray(task.tags) && task.tags.length > 0
            ? task.tags.map((tag, i) => (
                <span key={i} style={{ marginRight: 5 }}>
                  #{tag}
                </span>
              ))
            : "None"}
        </b>
      </p>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handleDetails}>Details</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleaddtags}>Add tags</button>
        <button onClick={handleaddcategory}>Add category</button>
      </div>
    </div>
  );
}

export default TaskCard;