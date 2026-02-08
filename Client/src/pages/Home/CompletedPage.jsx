import { useSelector } from "react-redux";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";

function CompletedTask() {
  const { task: tasks } = useSelector((store) => store.Task);
  return <TaskListRenderer tasks={tasks} />;
}

export default CompletedTask;
