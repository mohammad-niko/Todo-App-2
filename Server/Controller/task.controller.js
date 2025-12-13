import taskModel from "../models/task.model.js";

export const taskList = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const {
      page = 1,
      limit = 10,
      importance = "all",
      status = "all",
      sort = "normal",
      search = "",
    } = req.query;

    const query = { userID: userID };
    if (search) {
      query.title = new RegExp(search, "i");
    }
    if (status === "completed") {
      query.completed = true;
    } else if (status === "uncompleted") {
      query.completed = false;
    }
    if (importance === "important") {
      query.important = true;
    }

    const sortOptions = {};
    switch (sort) {
      case "newest":
        sortOptions.createdAt = -1;
        break;
      case "oldest":
        sortOptions.createdAt = 1;
        break;
      case "deadlineasc":
        sortOptions.deadLine = 1;
        break;
      case "deadlinedesc":
        sortOptions.deadLine = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const skip = (page - 1) * limit;
    const [tasks, totalCount] = await Promise.all([
      taskModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .select("-__v"),
      taskModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      status: "success",
      data: {
        tasks,
        pagination: {
          totalItems: totalCount,
          totalPages: totalPages,
          currentPage: page,
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error({ message: "task list have error", error: error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getTasksByDirectoryId = async (req, res) => {
  try {
    const { userID } = req.user;
    const { dirID } = req.params;

    const valid = await taskModel.find({ userID: userID, id: id });
    if (!valid)
      return res
        .status(404)
        .json({ status: "fail", message: "can't find tasks with this id" });

    const findTask = await taskModel
      .find({ userID: userID, dirID: dirID })
      .populate("dirID", "-_id directoryName");

    return res.status(200).json({
      status: "success",
      message: "Tasks fetched successfully",
      tasks: findTask,
    });
  } catch (error) {
    console.error({ message: "get dir tasks have error", error: error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { userID } = req.user;
    const { dirID } = req.params;
    const taskInfo = req.body;

    const directory = await directoryModel.findOne({
      dirID: dirID,
      userID: userID,
    });
    if (!directory) {
      return res.status(404).json({ message: "Directory not found." });
    }

    const task = {
      ...taskInfo,
      userID: userID,
      dirID: dirID,
    };

    const createTask = await taskModel.create(task);
    res.status(201).json({
      status: "success",
      message: "task created successfully",
      task: createTask,
    });
  } catch (error) {
    console.error({ message: "create task have error", error: error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { userID } = req.user;
    const { id } = req.params;
    const paylaoud = req.body;

    const valid = await taskModel.findById({ userID: userID, _id: id });
    if (!valid)
      return res
        .status(404)
        .josn({ status: "fail", message: "task not found with this id" });
    const update = await taskModel.findByIdAndUpdate(
      { userID: userID, _id: id },
      paylaoud,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "task updated successfully",
      newTask: update,
    });
  } catch (error) {
    console.error({ message: "update task have error", error: error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { userID } = req.user;
    const { id } = req.params;

    const valid = await taskModel.findById({ userID: userID, _id: id });
    if (!valid)
      return res
        .status(404)
        .josn({ status: "fail", message: "task not found with this id" });
    const deleted = await taskModel.findByIdAndDelete({
      userID: userID,
      _id: id,
    });

    res.status(200).json({
      status: "success",
      message: "task deleted successfully",
    });
  } catch (error) {
    console.error({ message: "delete task have error", error: error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};