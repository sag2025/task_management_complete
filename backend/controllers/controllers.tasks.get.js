
    const Task = require("../models/tasks");

async function get_task(req, res) {
  try {
    const userId = req.user.id;

    const { category, tags } = req.query;

    let result;

    
    if (category || tags) {
      result = await Task.getTasksByFilters(
        userId,
        category,
        tags
      );
    } 


    return res.status(200).json({
      tasks: result || [],
    });

  } catch (error) {
    console.error("GET TASK ERROR:", error);
    return res.status(500).json({
      message: "INTERNAL_ERROR",
    });
  }
}

module.exports = get_task;