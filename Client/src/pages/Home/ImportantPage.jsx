import { useSelector } from "react-redux";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";


function ImportantTask() {
  const tasks = useSelector((store) => store.Task.task).filter(
    (t) => t.important === true
  );

  return <TaskListRenderer tasks={tasks} />;
}

export default ImportantTask;
