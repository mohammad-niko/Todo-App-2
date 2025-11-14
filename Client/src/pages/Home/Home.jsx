import { Outlet } from "react-router";
import Header from "../../Components/Layout/Header";


function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Home;
