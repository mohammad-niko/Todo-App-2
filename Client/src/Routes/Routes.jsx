import Home from "../pages/Home/Home";
import ImportantTask from "../pages/Home/ImportantPage";
import CompletedTask from "../pages/Home/CompletedPage";
import UncompletedTask from "../pages/Home/UncompletedPage";
import AllTasks from "../Components/Layout/AllTasks";
const Routes = [
  {
    element: <Home />,
    children: [
      { path: "/", element: <AllTasks /> },
      { path: "/important-task", element: <ImportantTask /> },
      { path: "/completed-task", element: <CompletedTask /> },
      { path: "/uncompleted-task", element: <UncompletedTask /> },
    ],
  },
];

export default Routes;
