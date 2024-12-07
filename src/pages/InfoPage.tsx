import React from 'react'
import { Link } from "react-router";
import Info from "../components/Info";

const InfoPage: React.FC = () => {
    return (
        <Link to="/game" className="block w-screen h-screen absolute top-0 left-0 text-inherit text-blue-950">
            <Info/>
        </Link>
    );
};

export default InfoPage;
