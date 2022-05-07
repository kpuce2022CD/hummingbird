import { NextPage } from "next";
import React from "react";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Nav from "../components/Nav";

const Loginpage: NextPage = () => {
    return (
        <div>
            <Nav />
            <Login />
            <Footer/>
        </div>
    );
};

export default Loginpage;