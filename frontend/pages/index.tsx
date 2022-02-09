import type { NextPage } from "next";
import Banner from "../components/Banner";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <div>
      <Nav />
      <Banner />
    </div>
  );
};

export default Home;
