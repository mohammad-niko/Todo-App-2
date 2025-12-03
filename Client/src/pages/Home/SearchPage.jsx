import { useSearchParams } from "react-router";
import TaskListRenderer from "../../Components/Common/TaskListRenderer";
import { useSelector } from "react-redux";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const tasks = useSelector((store) => store.Task.task);
  const query = searchParams.get("search");
  const results =
    query.length > 0
      ? tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
      : [];


  return <TaskListRenderer tasks={results} />;
}

export default SearchPage;
