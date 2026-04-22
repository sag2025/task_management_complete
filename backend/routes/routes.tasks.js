const express = require("express");
const router = express.Router();

const { create_task } = require("../controllers/controllers.tasks.create");
const get_task=require("../controllers/controllers.tasks.get")
const authMiddleware=require("../middlewares/authmiddleware");
const { getTaskById } = require("../controllers/controllers.tasks.getById");
const { deleteTask } = require("../controllers/controllers.tasks.delete");
const { updateTask } = require("../controllers/controllers.tasks.update");


 
router.post("/",authMiddleware,create_task);
router.get("/",authMiddleware,get_task);
router.get("/:id", authMiddleware, getTaskById);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask);



module.exports = router;