import Home from "../pages/Home/HomePage";
import ImportantTask from "../pages/Home/ImportantPage";
import CompletedTask from "../pages/Home/CompletedPage";
import UncompletedTask from "../pages/Home/UncompletedPage";
import AllTasks from "../pages/Home/AllTasksPage";
import DirectoryTasks from "../pages/Home/DirectoryPage";
import SearchPage from "../pages/Home/SearchPage";
import TaskDetails from "../pages/Home/TaskDetails";

const Routes = [
  {
    element: <Home />,
    children: [
      { path: "/", element: <AllTasks /> },
      { path: "/important-task", element: <ImportantTask /> },
      { path: "/completed-task", element: <CompletedTask /> },
      { path: "/uncompleted-task", element: <UncompletedTask /> },
      { path: "/directory/:name", element: <DirectoryTasks /> },
      { path: "/result", element: <SearchPage /> },
      { path: "/task/:id/:slug", element: <TaskDetails /> },
    ],
  },
];

export default Routes;
