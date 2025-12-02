import { useParams } from "react-router";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";
import { useSelector } from "react-redux";

function DirectoryTasks() {
  const wichDirectory = useParams().name;
  const extractAndCapitalize = (name) =>
    name[0].toUpperCase() + name.substring(1);
  const tasks = useSelector((store) => store.Task.task).filter(
    (t) => t.directory === extractAndCapitalize(wichDirectory)
  );

  return <TaskListRenderer tasks={tasks} />;
}

export default DirectoryTasks;
