import { useParams, Navigate } from "react-router";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";
import { useSelector } from "react-redux";
import slugify from "slugify";

function TaskDetails() {
  const tasks = useSelector((store) => store.Task.task);
  const { id, slug } = useParams();

  const task = tasks.find((t) => t._id === id);
  const result = task ? [task] : [];
  if (task) {
    const correctSlug = slugify(task.title, { lower: true });
    if (correctSlug !== slug)
      return <Navigate to={`/task/${id}/${correctSlug}`} replace />;
  }

  return <TaskListRenderer tasks={result} />;
}

export default TaskDetails;
