import React from 'react';

import {NextPage} from "next";
import dynamic from "next/dynamic";
const PushNotifications = dynamic(import("./PushNotifications"),{ssr:false}) ;



const TokenPage: NextPage = () => {
  return <div className="App">
    <PushNotifications />
  </div>;
};

export default TokenPage;
