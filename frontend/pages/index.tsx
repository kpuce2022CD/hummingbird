import type { NextPage } from "next";
import Banner from "../components/Banner";
import FooterBanner from "../components/FooterBanner";
import Info from "../components/Info";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <div>
      <Nav />
      <Banner />
      <Info />
      <FooterBanner />
    </div>
  );
};

export default Home;
