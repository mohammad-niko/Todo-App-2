import { useSelector } from "react-redux";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";
import { useSearchParams } from "react-router";


function AllTasks() {
  const tasks = useSelector((store) => store.Task.task);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || "";

  const sortList = (tasks, sort) => {
    const list = [...tasks];
    switch (sort) {
      case "newest":
        return list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return list.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "deadlineasc":
        return list.sort((a, b) => new Date(a.deadLine) - new Date(b.deadLine));
      case "deadlinedesc":
        return list.sort((a, b) => new Date(b.deadLine) - new Date(a.deadLine));
      case "completed":
        return list.sort((a, b) => b.completed - a.completed);
      case "uncompleted":
        return list.sort((a, b) => a.completed - b.completed);
      case "important":
        return list.sort((a, b) => b.important - a.important);
      case "normal":
        return list.sort((a, b) => a.important - b.important);
      default:
        return list;
    }
  };

  return <TaskListRenderer tasks={sortList(tasks, sortValue)} />;
}

export default AllTasks;
