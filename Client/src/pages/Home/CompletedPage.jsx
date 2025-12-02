import { useSelector } from "react-redux";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";


function CompletedTask() {
  const tasks = useSelector((store) => store.Task.task).filter(
    (t) => t.completed === true
  );

  return <TaskListRenderer tasks={tasks} />;
}

export default CompletedTask;
