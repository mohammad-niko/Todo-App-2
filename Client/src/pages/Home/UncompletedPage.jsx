import { useSelector } from "react-redux";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";

function UncompletedTask() {
  const tasks = useSelector((store) => store.Task.task).filter(
    (t) => t.completed === false
  );

  return <TaskListRenderer tasks={tasks} />;
}

export default UncompletedTask;
