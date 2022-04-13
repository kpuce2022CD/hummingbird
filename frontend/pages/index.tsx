import type { NextPage } from "next";
import Banner from "../components/Banner";
import FooterBanner from "../components/FooterBanner";
import Info from "../components/Info";
import Nav from "../components/Nav";
import dynamic from 'next/dynamic'
import 'node-self'
const PushNotifications = dynamic(import("./PushNotifications"),{ssr:false}) ;
import React from "react";





const Home: NextPage = () => {

  return (
    <div>
      <Nav />
      <Banner />
      <Info />
        <PushNotifications />
      <FooterBanner />
    </div>
  );
};

export default Home;
