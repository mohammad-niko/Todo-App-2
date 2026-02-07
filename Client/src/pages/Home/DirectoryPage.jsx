import { useParams } from "react-router";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";
import { useSelector } from "react-redux";

function DirectoryTasks() {
  const { name } = useParams();

  const replace = name.replace(/-/g, " ");

  const tasks = useSelector((store) => store.Task.task).filter(
    (t) => t.dirName.toLowerCase() === replace.toLowerCase()
  );

  return <TaskListRenderer tasks={tasks} />;
}

export default DirectoryTasks;
