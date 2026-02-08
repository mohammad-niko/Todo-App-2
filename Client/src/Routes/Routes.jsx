import Home from "../pages/Home/HomePage";
import ImportantTask from "../pages/Home/ImportantPage";
import CompletedTask from "../pages/Home/CompletedPage";
import UncompletedTask from "../pages/Home/UncompletedPage";
import DirectoryTasks from "../pages/Home/DirectoryPage";
import SearchPage from "../pages/Home/SearchPage";
import TaskDetails from "../pages/Home/TaskDetails";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import SigninPage from "../pages/Signin/SigninPage";
import SignupPage from "../pages/Signup/SignupPage";
import VerifyEmailPage from "../pages/VerifyEmail/VerifyEmailPage";
import VerifyEmailInfoPage from "../pages/VerifyEmailInfo/VerifyEmailInfo";
import ProtectedauthRoute from "./ProtectedauthRoute";

const Routes = [
  {
    path: "/auth",
    element: <ProtectedauthRoute />,
    children: [
      { path: "signup", element: <SignupPage /> },
      { path: "signin", element: <SigninPage /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      { path: "verify-email-info", element: <VerifyEmailInfoPage /> },
    ],
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          { path: "important-task", element: <ImportantTask /> },
          { path: "completed-task", element: <CompletedTask /> },
          { path: "uncompleted-task", element: <UncompletedTask /> },
          { path: "directory/:name", element: <DirectoryTasks /> },
          { path: "result", element: <SearchPage /> },
          { path: "task/:id/:slug", element: <TaskDetails /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
];

export default Routes;
