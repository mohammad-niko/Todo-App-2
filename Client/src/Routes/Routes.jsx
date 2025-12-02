import Home from "../pages/Home/Home";
import ImportantTask from "../pages/Home/ImportantPage";
import CompletedTask from "../pages/Home/CompletedPage";
import UncompletedTask from "../pages/Home/UncompletedPage";
import AllTasks from "../pages/Home/AllTasks";
import DirectoryTasks from "../pages/Home/DirectoryTasks";
const Routes = [
  {
    element: <Home />,
    children: [
      { path: "/", element: <AllTasks /> },
      { path: "/important-task", element: <ImportantTask /> },
      { path: "/completed-task", element: <CompletedTask /> },
      { path: "/uncompleted-task", element: <UncompletedTask /> },
      { path: "/directory/:name", element: <DirectoryTasks /> },
    ],
  },
];

export default Routes;
