import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
    tags:[],
    category:"",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
  try {
    console.log("Fetching task...");

    const res = await authFetch(`http://localhost:3000/api/tasks/${id}`);
    console.log("Response:", res);

    const data = await res.json();
    console.log("Data:", data);

    if (res.ok) {
      setForm({
        title: data.title || "",
        description: data.description || "",
      due_date: data.due_date
  ? new Date(data.due_date)
      .toLocaleString("sv-SE")
      .replace(" ", "T")
      .slice(0, 16)
  : "",
        status: data.status || "pending",
        tags: data.tags || [],
        category: data.category || "",
      });
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
  } finally {
    console.log("Done loading");
    setLoading(false);
  }
};
    
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await authFetch(
      `http://localhost:3000/api/tasks/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      navigate("/tasks");
    }
  };

  if (loading) return <h3>Loading task...</h3>;

  return (
    <div style={{ padding: 20 ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h2>Update Task</h2>

      <form onSubmit={handleUpdate}
      style={{ padding: 20 ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:20,border:"10px solid red"}}>


        <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}} >

          <label>TITLE</label>
          <input style={{height:50,width:500}}
          name="title"
          value={form.title}
          onChange={handleChange}
        /></div>
        
        <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>

         <label>DESCRIPTION</label>
        <textarea style={{height:100,width:500}}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
         </div>

          <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>

         <label>CHOOSE TAGS</label>
        <textarea style={{height:100,width:500}}
  name="tags"
  value={form.tags.join(", ")}   // show as string
  onChange={(e) =>
    setForm({
      ...form,
      tags: e.target.value.split(",").map(tag => tag.trim())
    })
  }
/>
         </div>

          <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}} >

          <label>CHOOSE CATEGORY</label>
          <input style={{height:50,width:500}}
          name="category"
          value={form.category}
          onChange={handleChange}
        /></div>




         <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>
          <label>CHOOSE DUE DATE</label>
        <input style={{width:500,height:50}}
          type="datetime-local"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />
        </div>


<div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>
          <label>CHOOSE STATUS</label>
        <select style={{width:500,height:50}}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        </div>


<div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>
        <button style={{width:200,height:50}} type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;