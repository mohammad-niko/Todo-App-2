import { useSelector } from "react-redux";
import TaskCardAppList from "./TaskCardAppList";
import TaskCardFormatList from "./TaskCardFormatList";

function TaskListRenderer({ tasks }) {
  const isList = useSelector((store) => store.App.showTask);
  return (
    <>
      {isList
        ? tasks.map((item) => <TaskCardFormatList key={item._id} data={item} />)
        : tasks.map((item) => <TaskCardAppList key={item._id} data={item} />)}
    </>
  );
}

export default TaskListRenderer;
