import "./App.css";
import { useRoutes} from "react-router"
import Routes from "./Routes/Routes"
function App() {
  const route = useRoutes(Routes)
  return <>
  {route}
  </>;
}

export default App;
